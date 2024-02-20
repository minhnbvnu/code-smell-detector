function Cylinder(n,o,xr,yr,zr) {
  var phi, pts = [], inc = Math.PI * (3-sqrt(5)), off = 2/n, i, j, k, l;
  for(i = 0; i < n; ++i) {
    j = i * off - 1 + (off / 2);
    phi = i * inc;
    k = cos(phi);
    l = sin(phi);
    pts.push(o ? [j * xr, k * yr, l * zr] : [k * xr, j * yr, l * zr]);
  }
  return pts;
}