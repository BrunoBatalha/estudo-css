'use strict';
function main() {
  const canvas = document.querySelector('canvas');
  const GAME_SPEED = 10;
  const ctx = canvas.getContext('2d');
  const TIME_TO_OBSTACLE = getValueByPercentage(GAME_SPEED, 300);
  const TIME_TO_INCREASE_DIFFICULTY = getValueByPercentage(GAME_SPEED, 1000);
  const TIME_TO_BULLET = getValueByPercentage(GAME_SPEED, 100);
  let ship;
  let obstacles = [];
  let playing;
  let score;
  let speedShip;
  let speedBullet;
  let speedObstacle;
  let timeToGenerateObstacle;
  let timeToIncreaseDifficulty;
  let timeToBullet;

  function initGame() {
    obstacles = [];
    playing = true;
    score = 0;
    speedShip = getValueByPercentage(GAME_SPEED, 100);
    speedBullet = getValueByPercentage(GAME_SPEED, 100);
    speedObstacle = GAME_SPEED - getValueByPercentage(GAME_SPEED, 70);
    timeToGenerateObstacle = TIME_TO_OBSTACLE;
    timeToIncreaseDifficulty = TIME_TO_INCREASE_DIFFICULTY;
    timeToBullet = TIME_TO_BULLET;
    const img = new Image();
    img.src = './img/ship_sprite.png';
    ship = new Ship(
      0,
      canvas.height - 50,
      21,
      26.5,
      speedShip,
      ctx,
      speedBullet,
      timeToBullet,
      img
    );
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
    const posX = randomNumberInt(canvas.width - 50);
    const newObstacle = new Obstacle(posX, 0, 100, 50, speedObstacle, '#8e44ad', ctx);
    return newObstacle;
  }

  function isColliding(entity1, entity2) {
    return !(
      entity1.x > entity2.getXWidth() ||
      entity1.getXWidth() < entity2.x ||
      entity1.y < entity2.y ||
      entity1.y - entity1.height > entity2.y
    );
  }

  function checkCollisions() {
    obstacles.forEach((obstacle, indexObstacle) => {
      ship.bullets.forEach((bullet, indexBullet) => {
        if (isColliding(obstacle, bullet)) {
          obstacles.splice(indexObstacle, 1);
          ship.bullets.splice(indexBullet, 1);
          score++;
          newScore(score);
        }
      });
    });
  }

  function initControllers() {
    ship.controller();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ship.draw();
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

    ship.update(canvas.width);
    obstacles.forEach((o) => {
      if (o.y > canvas.height - 50) playing = false;
      else if (o.y > canvas.height) {
        obstacles.shift();
        score--;
        newScore(score);
      } else o.update();
      o.update();
      // ship.x = o.x;
    });

    if (timeToIncreaseDifficulty === 0) speedObstacle += getValueByPercentage(speedObstacle, 10);

    timeToGenerateObstacle--;
    timeToIncreaseDifficulty--;
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
