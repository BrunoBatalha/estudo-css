const canvas = document.querySelector("canvas");
let ctx;

// Classes

class Bullet {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
  autoMove() {
    this.y -= this.speed;
  }
}
class Ship {
  constructor(x, y, width, height, speed = 5, qntBullets = 10) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    const bullets = [];
    for (let i = 0; i < qntBullets; i++) {
      bullets.push(new Bullet(x + width, y - 50, 10, 10, 5));
    }
    this.bullets = bullets;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    this.bullets.forEach(b => {
      b.draw();
    });
  }
  autoShot() {}
}

const ship = new Ship(0, canvas.height - 50, 30, 20);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ship.draw();
}

function update() {}

function run() {
  update();
  draw();
  
  window.requestAnimationFrame(run);
}

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 39) ship.x += ship.speed;
  if (e.keyCode === 37) ship.x -= ship.speed;
});

function main() {
  ctx = canvas.getContext("2d");
  run();
}

main();
