'use strict';
function main() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const GAME_SPEED = 10;
  const SNAKE_SPEED = getValueByPercentage(GAME_SPEED, 50);
  const TIME_TO_OBSTACLE = getValueByPercentage(GAME_SPEED, 1000);
  const HIGHSCORE = 'highscore';
  const COLOR_SNAKE_LOSE = '#e74c3c';
  const STATES_ENUM = {
    IN_GAME: 'IN_GAME',
    IN_GAMEOVER: 'IN_GAMEOVER',
    IN_MENU: 'IN_MENU',
  };
  const MANAGE_STATE = {
    IN_GAME: () => {
      update();
      draw();
    },
    IN_GAMEOVER: () => {
      manageGameOver();
    },
    IN_MENU: () => {
      manageMenu();
    },
  };
  let state_current = STATES_ENUM.IN_MENU;

  let snake;
  let obstacles = [];
  let playing;
  let score;
  let speedSnake;
  let speedObstacle;
  let timeToGenerateObstacle;

  function manageInitGame() {
    obstacles = [];
    playing = true;
    score = 0;
    speedSnake = SNAKE_SPEED;
    speedObstacle = GAME_SPEED - getValueByPercentage(GAME_SPEED, 70);
    timeToGenerateObstacle = TIME_TO_OBSTACLE;
    snake = new Snake(canvas.width / 2 - 6, canvas.height / 2 + 12, 10, 10, speedSnake, ctx, 50);
    changeText('0');
    loadHighscore();
    document.removeEventListener('keydown', listenerResetGame);
    document.removeEventListener('touchstart', listenerResetGameMobile);
    initControllers();
  }

  function manageGameOver() {
    changeText('Fim de jogo');
    document.addEventListener('keydown', listenerResetGame);
    document.addEventListener('touchstart', listenerResetGameMobile);
  }

  function manageMenu() {
    if (window.matchMedia('(max-width:425px)').matches) {
      changeText('Toque para iniciar');
      document.addEventListener('touchstart', listenerResetGameMobile);
    } else {
      changeText('Aperte Ctrl para iniciar');
      document.addEventListener('keydown', listenerResetGame);
    }
  }

  function changeText(msg) {
    const e = document.querySelector('#text');
    e.innerHTML = msg;
  }

  function changeTextHighscore(score) {
    const e = document.querySelector('#highscore');
    e.innerHTML = 'HIGHSCORE LOCAL: ' + score;
  }

  function newScore(score) {
    changeText(score);
  }

  function listenerResetGame(e) {
    if (e.key === 'ContextMenu' || e.key === 'Control') {
      manageInitGame();
      state_current = STATES_ENUM.IN_GAME;
    }
  }
  function listenerResetGameMobile(e) {
    manageInitGame();
    state_current = STATES_ENUM.IN_GAME;
  }

  function randomNumberInt(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
  }

  function getValueByPercentage(totalValue, percentage) {
    return (totalValue * percentage) / 100;
  }

  function generateObstacle() {
    const posX = randomNumberInt(canvas.width - 10);
    const posY = randomNumberInt(canvas.height - 10);
    const newObstacle = new Obstacle(posX, posY, 10, 10, speedObstacle, '#8e44ad', ctx);
    return newObstacle;
  }

  function isEating(entity1, entity2) {
    return (
      (entity2.x >= entity1.x &&
        entity2.x <= entity1.getXWidth() &&
        entity2.y >= entity1.y &&
        entity2.y <= entity1.getYHeigth()) ||
      (entity2.getXWidth() >= entity1.x &&
        entity2.getXWidth() <= entity1.getXWidth() &&
        entity2.getYHeigth() >= entity1.y &&
        entity2.getYHeigth() <= entity1.getYHeigth())
    );
  }

  function getHighscore() {
    return Number(window.localStorage.getItem(HIGHSCORE) || 0);
  }

  function lose() {
    state_current = STATES_ENUM.IN_GAMEOVER;
    snake.colorPrimary = COLOR_SNAKE_LOSE;
    if (score > getHighscore()) {
      window.localStorage.setItem(HIGHSCORE, score);
    }
  }

  function getIndexObstacleCollided() {
    return obstacles.findIndex((obstacle) => isEating(obstacle, snake));
  }

  function hasTailColisions() {
    let isColliding = false;
    snake.way.forEach((block, i) => {
      const hasCollision = block.x === snake.x && block.y === snake.y;
      if (hasCollision && i < snake.way.length - 1) isColliding = true;
    });
    return isColliding;
  }

  function hasCollisionWithWall() {
    return (
      snake.x < 0 ||
      snake.getXWidth() >= canvas.width ||
      snake.y < 0 ||
      snake.getYHeigth() >= canvas.height
    );
  }

  function checkCollisions() {
    const indexObstacle = getIndexObstacleCollided();
    if (indexObstacle > -1) {
      obstacles.splice(indexObstacle, 1);
      score++;
      newScore(score);
      snake.increase();
    }
    if (hasTailColisions() || hasCollisionWithWall()) lose();
  }

  function initControllers() {
    snake.controller();
    // document.addEventListener('keydown', (e) => {
    //   // if (e.key === 'Escape') state_current = STATES_ENUM.IN_GAME;
    //   console.log(e.key);
    // });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.draw();
    obstacles.forEach((o) => {
      o.draw();
    });
  }

  function update() {
    checkCollisions();
    if (timeToGenerateObstacle === 0) {
      obstacles.push(generateObstacle());
      timeToGenerateObstacle = TIME_TO_OBSTACLE;
    }

    snake.update();
    obstacles.forEach((o) => {
      // if (o.y > canvas.height - 50) playing = false;
      // else if (o.y > canvas.height) {
      //   obstacles.shift();
      //   score--;
      //   newScore(score);
      // } else o.update();
      o.update();
      // ship.x = o.x;
    });

    // if (timeToIncreaseDifficulty === 0) speedObstacle += getValueByPercentage(speedObstacle, 10);

    timeToGenerateObstacle--;
    // timeToIncreaseDifficulty--;
  }

  function run() {
    MANAGE_STATE[state_current]();
    window.requestAnimationFrame(run);
  }

  function loadHighscore() {
    const highscore = getHighscore();
    changeTextHighscore(highscore);
  }

  function init() {
    manageInitGame();
    run();
  }

  init();
}
main();
