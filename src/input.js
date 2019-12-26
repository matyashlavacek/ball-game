export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;

        case 27:
          game.togglePause();
          break;

        case 32:
          game.start();
          break;

        default:
          console.log(event.keyCode);
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) {
            paddle.stop();
          }
          break;

        case 39:
          if (paddle.speed > 0) {
            paddle.stop();
          }
          break;

        default:
          console.log(event.keyCode);
          break;
      }
    });
    let startX = 0;
    document.addEventListener(
      "touchstart",
      function(e) {
        game.start();
        startX = e.changedTouches[0].screenX;
      },
      false
    );
    document.addEventListener("touchmove", function(e) {
      if (startX > e.changedTouches[0].screenX) {
        paddle.moveLeft();
      } else {
        paddle.moveRight();
      }
    });
    document.addEventListener(
      "touchend",
      function(e) {
        paddle.stop();
      },
      false
    );
  }
}
