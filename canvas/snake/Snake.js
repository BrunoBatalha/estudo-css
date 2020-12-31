'use strict';
let tamanhoCaminho = 500;
let tamanhoTela = 500;

class Snake {
  constructor(x, y, width, height, gameSpeed, ctx, size) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = -gameSpeed;
    this.gameSpeed = gameSpeed;
    this.ctx = ctx;

    this.size = size;
    this.way = [];

    this.directionCurrent = 'ArrowUp';
    this.directionsUpdate = {
      ArrowRight: () => {
        this.x += this.speed;
      },
      ArrowLeft: () => {
        this.x += this.speed;
      },
      ArrowDown: () => {
        this.y += this.speed;
      },
      ArrowUp: () => {
        this.y += this.speed;
      },
    };
    this.handleKey = {
      allowedKeys: ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'],
      ArrowRight: (key) => {
        if (this.directionCurrent !== 'ArrowLeft') {
          this.directionCurrent = key;
          this.speed = +this.gameSpeed;
        }
      },
      ArrowLeft: (key) => {
        if (this.directionCurrent !== 'ArrowRight') {
          this.directionCurrent = key;
          this.speed = -this.gameSpeed;
        }
      },
      ArrowDown: (key) => {
        if (this.directionCurrent !== 'ArrowUp') {
          this.directionCurrent = key;
          this.speed = +this.gameSpeed;
        }
      },
      ArrowUp: (key) => {
        if (this.directionCurrent !== 'ArrowDown') {
          this.directionCurrent = key;
          this.speed = -this.gameSpeed;
        }
      },
    };
  }

  update() {
    this.directionsUpdate[this.directionCurrent]();
    this.way.push({
      x: this.x,
      y: this.y,
      getXWidth: () => this.x + 3,
      getYHeigth: () => this.y + 3,
    });
    while (this.way.length > this.size) {
      this.way.shift();
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ecf0f1';
    // this.ctx.fillRect(this.x, this.y, this.height, this.width);
    for (let i = 0; i < this.way.length; i++) {
      this.ctx.fillRect(this.way[i].x, this.way[i].y, 10, 10);
    }
    this.ctx.fill();
  }

  controller() {
    document.addEventListener('keydown', (e) => {
      const canKey = this.handleKey.allowedKeys.includes(e.key);
      if (canKey) {
        this.handleKey[e.key](e.key);
      }
    });
  }

  increase() {
    this.size += 5;
  }

  getXWidth() {
    return this.x + this.width;
  }

  getYHeigth() {
    return this.y + this.height;
  }
}
