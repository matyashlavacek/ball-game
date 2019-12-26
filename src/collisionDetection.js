export function detectCollision(ball, gameObject) {
  let topOfBall = ball.position.y;
  let bottomBall = ball.position.y + ball.size;
  let oldTopOfBall = ball.oldPosition.y;
  let oldBottomOfBall = ball.oldPosition.y + ball.size;
  let leftBall = ball.position.x;
  let rightBall = ball.position.x + ball.size;
  let oldLeftBall = ball.oldPosition.x;
  let oldRightBall = ball.oldPosition.x + ball.size;

  let topObject = gameObject.position.y;
  let bottomObject = gameObject.position.y + gameObject.height;
  let leftObject = gameObject.position.x;
  let rightObject = gameObject.position.x + gameObject.width;

  let collision = {
    vertical: false,
    horizontal: false
  };

  let isInHoriz = rightBall >= leftObject && leftBall <= rightObject;
  let isInVerti = bottomBall >= topObject && topOfBall <= bottomObject;

  let crossedTop =
    oldBottomOfBall < topObject && bottomBall >= topObject && isInHoriz;
  let crossedBot =
    oldTopOfBall > bottomObject && topOfBall <= bottomObject && isInHoriz;
  let crossedLeft =
    oldRightBall < leftObject && rightBall >= leftObject && isInVerti;
  let crossedRight =
    oldLeftBall > rightObject && leftBall <= rightObject && isInVerti;

  if (crossedTop || crossedBot) {
    collision.vertical = true;
  }
  if (crossedLeft || crossedRight) {
    collision.horizontal = true;
  }
  return collision;
}
