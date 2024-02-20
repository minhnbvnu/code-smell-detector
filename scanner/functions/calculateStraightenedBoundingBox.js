function calculateStraightenedBoundingBox(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
  var angle = 0;
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (dy == 0) {
    return canculateStandardBoundingBox(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  }

  var adx = Math.abs(dx);
  var ady = Math.abs(dy);

  var d1 = 0.0;
  var d2 = 90.0;
  var d3 = 180.0;
  var d4 = 270.0;
  var PI = Math.PI;
  var sin = Math.sin;
  var cos = Math.cos;

  if (dx == 0) angle = dy >= 0 ? d2 : d4;else if (dx > 0 && dy > 0) angle = d1 + Math.atan(ady / adx) * (180 / PI); // X+, Y+
  else if (dx < 0 && dy < 0) angle = d3 + Math.atan(ady / adx) * (180 / PI); // X-, Y-
    else if (dx < 0 && dy > 0) angle = d2 + Math.atan(adx / ady) * (180 / PI); // X-, Y+
      else if (dx > 0 && dy < 0) angle = d4 + Math.atan(adx / ady) * (180 / PI); // X+, Y-

  var phi = -(angle * PI / 180.0);

  cx1 -= x1;
  cy1 -= y1;
  cx2 -= x1;
  cy2 -= y1;
  x2 -= x1;
  y2 -= y1;

  var ncx1 = cx1 * cos(phi) - cy1 * sin(phi);
  var ncy1 = cx1 * sin(phi) + cy1 * cos(phi);
  var ncx2 = cx2 * cos(phi) - cy2 * sin(phi);
  var ncy2 = cx2 * sin(phi) + cy2 * cos(phi);
  var nx2 = x2 * cos(phi) - y2 * sin(phi);
  var ny2 = x2 * sin(phi) + y2 * cos(phi);

  var bounds = canculateStandardBoundingBox(0, 0, ncx1, ncy1, ncx2, ncy2, nx2, ny2);

  phi = angle * PI / 180.0;

  return [x1 + (bounds[0] * Math.cos(phi) - bounds[1] * Math.sin(phi)), y1 + (bounds[0] * Math.sin(phi) + bounds[1] * Math.cos(phi)), x1 + (bounds[2] * Math.cos(phi) - bounds[3] * Math.sin(phi)), y1 + (bounds[2] * Math.sin(phi) + bounds[3] * Math.cos(phi)), x1 + (bounds[4] * Math.cos(phi) - bounds[5] * Math.sin(phi)), y1 + (bounds[4] * Math.sin(phi) + bounds[5] * Math.cos(phi)), x1 + (bounds[6] * Math.cos(phi) - bounds[7] * Math.sin(phi)), y1 + (bounds[6] * Math.sin(phi) + bounds[7] * Math.cos(phi))];
}