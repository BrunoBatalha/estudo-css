'use strict';
class Ship {
  constructor(x, y, width, height, gameSpeed, ctx, speedBullet, timeToShotBullet, spriteImg) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.gameSpeed = gameSpeed;
    this.ctx = ctx;
    this.timeToShotBulletMain = timeToShotBullet;
    this.timeToShotBullet = timeToShotBullet;
    this.bullets = [];
    this.speedBullet = speedBullet;
    this.spriteImg = spriteImg;
    this.positionSprite = 1;
  }

  update(canvasWidth) {
    const newPos = {};
    newPos.x_ = this.x + this.speed;
    newPos.xWidth = newPos.x_ + this.width;

    if (newPos.x_ < 0) this.x = 0;
    else if (newPos.xWidth > canvasWidth) this.x = canvasWidth - this.width;
    else this.x += this.speed;

    this.timeToShotBullet--;
    if (this.timeToShotBullet === 0) {
      const newBullet = new Bullet(
        this.x + this.width / 2 - 5,
        this.y,
        10,
        10,
        this.speedBullet,
        '#c0392b',
        this.ctx
      );
      this.bullets.push(newBullet);
      this.timeToShotBullet = this.timeToShotBulletMain;
    }
    this.bullets.forEach((b) => {
      if (b.y < 0) this.bullets.shift();
      else b.update();
    });
  }

  draw() {
    this.ctx.drawImage(
      this.spriteImg,
      0 + this.width * this.positionSprite,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width + 10,
      this.height + 20
    );

    // this.ctx.beginPath();
    // this.ctx.fillStyle = '#ecf0f1';
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    // this.ctx.fill();
    this.bullets.forEach((b) => {
      b.draw();
    });
  }

  controller() {
    document.addEventListener('keydown', (e) => {
      this.positionSprite++;
      if (this.positionSprite >= 5) this.positionSprite = 0;
      const handleKey = {
        allowedKeys: ['ArrowRight', 'ArrowLeft'],
        ArrowRight: () => {
          this.speed = +this.gameSpeed;
        },
        ArrowLeft: () => {
          this.speed = -this.gameSpeed;
        },
      };
      const canKey = handleKey.allowedKeys.includes(e.key);
      if (canKey) handleKey[e.key]();
    });

    document.addEventListener('keyup', (e) => {
      this.speed = 0;
    });
  }

  getXWidth() {
    return this.x + this.width;
  }

  autoShot() {}
}
