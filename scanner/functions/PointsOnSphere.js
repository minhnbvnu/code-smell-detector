function PointsOnSphere(n,xr,yr,zr) {
  var i, y, r, phi, pts = [], inc = Math.PI * (3-sqrt(5)), off = 2/n;
  for(i = 0; i < n; ++i) {
    y = i * off - 1 + (off / 2);
    r = sqrt(1 - y*y);
    phi = i * inc;
    pts.push([cos(phi) * r * xr, y * yr, sin(phi) * r * zr]);
  }
  return pts;
}