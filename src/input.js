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
    document.addEventListener("touchstart", event => {
      switch (event.touches.length) {
        case 1:
          game.start();
          break;

        default:
          console.log(event.touches.length);
          break;
      }
    });
    document.addEventListener("touchend", event => {
      paddle.stop();
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
    // TEST
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
      return (
        evt.touches || evt.originalEvent.touches // browser API
      ); // jQuery
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          /* left swipe */
          paddle.moveLeft();
        } else {
          /* right swipe */
          paddle.moveRight();
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
        } else {
          /* down swipe */
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
    // TEST
  }
}
