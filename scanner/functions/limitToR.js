function limitToR(x, y, maxR) {
  var r = sqrt(x * x + y * y), theta
  if (r > maxR) {
    theta = acos(x / r)
    if (y > 0) theta = tau - theta
    x = cos(theta) * maxR, y = - sin(theta) * maxR
  }
  return [x, y]
}