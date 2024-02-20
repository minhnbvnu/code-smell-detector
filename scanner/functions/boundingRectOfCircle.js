function boundingRectOfCircle(circle) {
  circle = element_object(circle);

  var cx = circle.cx || 0;
  var cy = circle.cy || 0;
  var r = circle.r;

  return {
    left: cx - r,
    top: cy - r,
    right: cx + r,
    bottom: cy + r,
    width: 2 * r,
    height: 2 * r
  };
}