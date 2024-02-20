function d3_geo_boundsGeometryCollection(o, f) {
  for (var a = o.geometries, i = 0, n = a.length; i < n; i++) {
    d3_geo_bounds(a[i], f);
  }
}