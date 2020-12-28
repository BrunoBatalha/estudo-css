'use strict';
function main() {
  const canvas = document.querySelector('canvas');
  const GAME_SPEED = 10;
  const ctx = canvas.getContext('2d');
  const TIME_TO_OBSTACLE = getValueByPercentage(GAME_SPEED, 300);
  const TIME_TO_INCREASE_DIFFICULTY = getValueByPercentage(GAME_SPEED, 1000);
  let snake;
  let obstacles = [];
  let playing;
  let score;
  let speedSnake;
  let speedObstacle;
  let timeToGenerateObstacle;
  let timeToIncreaseDifficulty;

  function initGame() {
    obstacles = [];
    playing = true;
    score = 0;
    speedSnake = getValueByPercentage(GAME_SPEED, 50);
    speedObstacle = GAME_SPEED - getValueByPercentage(GAME_SPEED, 70);
    timeToGenerateObstacle = TIME_TO_OBSTACLE;
    timeToIncreaseDifficulty = TIME_TO_INCREASE_DIFFICULTY;
    snake = new Snake(0, canvas.height - 50, 10, 10, speedSnake, ctx);
    document.querySelector('#text-center').innerHTML = 0;
    document.removeEventListener('keydown', listenerResetGame);
    initControllers();
  }

  function newScore(score) {
    const eText = document.querySelector('#text-center');
    eText.innerHTML = score;
  }

  function listenerResetGame(e) {
    if (e.key === 'ArrowDown') initGame();
  }

  function gameOver() {
    const eText = document.querySelector('#text-center');
    eText.innerHTML = 'O Boleto venceu';
    document.addEventListener('keydown', listenerResetGame);
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

  function isEat(entity1, entity2) {
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

  function checkCollisions() {
    obstacles.forEach((obstacle, indexObstacle) => {
      if (isEat(obstacle, snake)) {
        obstacles.splice(indexObstacle, 1);
        score++;
        newScore(score);
        snake.increase();
      }
    });
  }

  function initControllers() {
    snake.controller();
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
    if (playing) {
      update();
      draw();
    } else {
      gameOver();
    }

    window.requestAnimationFrame(run);
  }

  function init() {
    initGame();
    run();
  }

  init();
}
main();
