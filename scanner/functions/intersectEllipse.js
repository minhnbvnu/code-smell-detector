function intersectEllipse(node, ellipseOrCircle, point) {
  // Formulae from: http://mathworld.wolfram.com/Ellipse-LineIntersection.html

  var cx = node.x;
  var cy = node.y;
  var rx, ry;

  if (isCircle(ellipseOrCircle)) {
    rx = ry = ellipseOrCircle.r.baseVal.value;
  } else {
    rx = ellipseOrCircle.rx.baseVal.value;
    ry = ellipseOrCircle.ry.baseVal.value;
  }

  var px = cx - point.x;
  var py = cy - point.y;

  var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);

  var dx = Math.abs(rx * ry * px / det);
  if (point.x < cx) {
    dx = -dx;
  }
  var dy = Math.abs(rx * ry * py / det);
  if (point.y < cy) {
    dy = -dy;
  }

  return {x: cx + dx, y: cy + dy};
}