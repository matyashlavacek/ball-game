import { detectCollision } from "/src/collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("imageBall");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.size = 25;
    this.reset();
  }

  reset() {
    this.position = {
      x: Math.floor(Math.random() * 800),
      y: 400
    };
    this.oldPosition = {
      x: this.position.x,
      y: this.position.y
    };
    let rndBool = Math.random() >= 0.5;
    this.speed = {
      x: rndBool ? 6 : -6,
      y: -6
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.oldPosition.x = this.position.x;
    this.oldPosition.y = this.position.y;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    if (this.position.y > this.gameHeight - this.size) {
      this.game.lives--;
      this.reset();
    }

    let collision = detectCollision(this, this.game.paddle);
    if (collision.vertical) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
    if (collision.horizontal) {
      this.speed.x = -this.speed.x;
      this.position.x = this.game.paddle.position.x - this.size;
    }
  }
}
