'use strict';
class Obstacle {
  constructor(x, y, width, height, speed = 5, color = '#c0392b', ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.color = color;
    this.ctx = ctx;
  }

  update() {
    // this.y += this.speed;
  }

  draw() {
    // this.ctx.drawImage(this.spriteImg, 0, 0, 180, 146, this.x, this.y, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
  }

  getXWidth() {
    return this.x + this.width;
  }

  getYHeigth() {
    return this.y + this.height;
  }
}
