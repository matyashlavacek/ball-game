import { detectCollision } from "/src/collisionDetection";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("imageBrick");

    this.game = game;

    this.position = position;
    this.width = 80;
    this.height = 24;

    this.markedForDeletion = false;
  }

  update() {
    let collision = detectCollision(this.game.ball, this);
    if (collision.vertical) {
      this.markedForDeletion = true;
      this.game.ball.position.y = this.game.ball.oldPosition.y;
      this.game.ball.speed.y = -this.game.ball.speed.y;
    }
    if (collision.horizontal) {
      this.markedForDeletion = true;
      this.game.ball.position.x = this.game.ball.oldPosition.x;
      this.game.ball.speed.x = -this.game.ball.speed.x;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
