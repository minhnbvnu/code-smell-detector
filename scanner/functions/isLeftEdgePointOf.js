function isLeftEdgePointOf(point, ancestor) {
  return isLeftEdgePoint(point) && dom_isLeftEdgeOf(point.node, ancestor);
}