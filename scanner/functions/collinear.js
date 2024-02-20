function collinear(a, b, c, thresholdAngle) {

  if (!thresholdAngle) {
    return areaTriangle(a, b, c) === 0;
  }

  if (typeof collinear.tmpPoint1 === 'undefined') {
    collinear.tmpPoint1 = [];
    collinear.tmpPoint2 = [];
  }

  var ab = collinear.tmpPoint1, bc = collinear.tmpPoint2;
  ab.x = b.x - a.x;
  ab.y = b.y - a.y;
  bc.x = c.x - b.x;
  bc.y = c.y - b.y;

  var dot = ab.x * bc.x + ab.y * bc.y,
    magA = Math.sqrt(ab.x * ab.x + ab.y * ab.y),
    magB = Math.sqrt(bc.x * bc.x + bc.y * bc.y),
    angle = Math.acos(dot / (magA * magB));

  return angle < thresholdAngle;
}