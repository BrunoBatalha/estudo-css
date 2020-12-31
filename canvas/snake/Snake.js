'use strict';
let tamanhoCaminho = 500;
let tamanhoTela = 500;

class Snake {
  constructor(
    x,
    y,
    width,
    height,
    gameSpeed,
    ctx,
    size,
    colorPrimary = '#ecf0f1',
    colorShine = '#2ecc71'
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = -gameSpeed;
    this.gameSpeed = gameSpeed;
    this.ctx = ctx;
    this.size = size;
    this.way = [];
    this.colorTemp = colorPrimary;
    this.colorPrimary = colorPrimary;
    this.colorShine = colorShine;
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
      xWidth: this.x + 3,
      yHeigth: this.y + 3,
    });
    while (this.way.length > this.size) {
      this.way.shift();
      this.colorPrimary = this.colorTemp;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colorPrimary;
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

    // mobile
    let startX, startY;
    let endX, endY;
    document.addEventListener('touchstart', (e) => {
      startX = Math.floor(e.touches.item(0).pageX);
      startY = Math.floor(e.touches.item(0).pageY);
    });
    document.addEventListener('touchmove', (e) => {
      endX = Math.floor(e.touches.item(0).pageX);
      endY = Math.floor(e.touches.item(0).pageY);
      const difX = Math.abs(endX - startX);
      const difY = Math.abs(endY - startY);
      const isMovingHorizontal = difX > difY;
      if (isMovingHorizontal) {
        // console.log('considero horizontal');
        const isMovingToRight = endX > startX;
        if (isMovingToRight && this.directionCurrent !== 'ArrowRight') {
          this.directionCurrent = 'ArrowLeft';
          this.speed = +this.gameSpeed;
        } else {
          if (this.directionCurrent !== 'ArrowLeft') {
            this.directionCurrent = 'ArrowRight';
            this.speed = -this.gameSpeed;
          }
        }
      } else {
        // console.log('considero vertical');
        const isMovingToDown = endY > startY;
        if (isMovingToDown && this.directionCurrent !== 'ArrowDown') {
          this.directionCurrent = 'ArrowUp';
          this.speed = +this.gameSpeed;
        } else {
          if (this.directionCurrent !== 'ArrowUp') {
            this.directionCurrent = 'ArrowDown';
            this.speed = -this.gameSpeed;
          }
        }
      }
    });

    const btnLeft = document.querySelector('#btnLeft');
    const btnRight = document.querySelector('#btnRight');
    const btnUp = document.querySelector('#btnUp');
    const btnDown = document.querySelector('#btnDown');
    btnLeft.addEventListener('click', () => {
      const direction = 'ArrowLeft';
      const canKey = this.handleKey.allowedKeys.includes(direction);
      if (canKey) {
        this.handleKey[direction](direction);
      }
    });
    btnRight.addEventListener('click', () => {
      const direction = 'ArrowRight';
      const canKey = this.handleKey.allowedKeys.includes(direction);
      if (canKey) {
        this.handleKey[direction](direction);
      }
    });
    btnUp.addEventListener('click', () => {
      const direction = 'ArrowUp';
      const canKey = this.handleKey.allowedKeys.includes(direction);
      if (canKey) {
        this.handleKey[direction](direction);
      }
    });
    btnDown.addEventListener('click', () => {
      const direction = 'ArrowDown';
      const canKey = this.handleKey.allowedKeys.includes(direction);
      if (canKey) {
        this.handleKey[direction](direction);
      }
    });
  }

  increase() {
    this.size += 5;
    this.colorTemp = this.colorPrimary;
    this.colorPrimary = this.colorShine;
  }

  getXWidth() {
    return this.x + this.width;
  }

  getYHeigth() {
    return this.y + this.height;
  }
}
