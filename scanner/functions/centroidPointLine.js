function centroidPointLine(x, y) {
  var dx = x - x0, dy = y - y0, z = sqrt(dx * dx + dy * dy);
  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;
  centroidPoint(x0 = x, y0 = y);
}