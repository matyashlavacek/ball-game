import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import { buildLevel, level1 } from "/src/levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  WON: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAME_STATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.gameObjects = [];
    this.lives = 3;
    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.WON ||
      this.gameState === GAME_STATE.GAME_OVER
    ) {
      if (
        this.gameState === GAME_STATE.WON ||
        this.gameState === GAME_STATE.GAME_OVER
      ) {
        this.gameObjects = [];
        this.lives = 3;
        this.paddle.reset();
        this.ball.reset();
      }
      this.bricks = buildLevel(this, level1);
      this.gameObjects = [this.ball, this.paddle];
      this.gameState = GAME_STATE.RUNNING;
    }
    return;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gameState = GAME_STATE.GAME_OVER;
    if (
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.GAME_OVER ||
      this.gameState === GAME_STATE.WON
    ) {
      return;
    }
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    if (this.bricks.length === 0) {
      this.gameState = GAME_STATE.WON;
    }
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

    // Draw lives
    ctx.font = "14px Arial";
    ctx.fillStyle = "#f00";
    ctx.textAlign = "center";
    ctx.fillText(
      `Lives: ${this.lives}`,
      this.gameWidth / 2,
      this.gameHeight / 2
    );

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAME_STATE.GAME_OVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game OVER!!!", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.WON) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("You won!!!", this.gameWidth / 2, this.gameHeight / 2);
      ctx.fillText(
        "Press SPACEBAR to Start over",
        this.gameWidth / 2,
        this.gameHeight / 2 + 30
      );
    }
  }

  togglePause() {
    if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }
}
