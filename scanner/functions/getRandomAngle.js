function getRandomAngle(currentDirection) {
  var a = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
  if (currentDirection == NORTH) return a - 90;
  if (currentDirection == EAST) return a;
  if (currentDirection == SOUTH) return a + 90;
  if (currentDirection == WEST) return a + 180;
  return 0;
}