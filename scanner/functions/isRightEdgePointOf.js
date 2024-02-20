function isRightEdgePointOf(point, ancestor) {
  return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
}