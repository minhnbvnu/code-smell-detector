function science_lin_decomposeCdiv(xr, xi, yr, yi) {
  if (Math.abs(yr) > Math.abs(yi)) {
    var r = yi / yr,
        d = yr + r * yi;
    return [(xr + r * xi) / d, (xi - r * xr) / d];
  } else {
    var r = yr / yi,
        d = yi + r * yr;
    return [(r * xr + xi) / d, (r * xi - xr) / d];
  }
}