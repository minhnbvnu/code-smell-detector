function getPathBBox(points) {
  var bbox = [Infinity, Infinity, -Infinity, -Infinity];
  var p;
  for (var i=0, n=points.length; i<n; i++) {
    p = points[i].anchor;
    if (p[0] < bbox[0]) bbox[0] = p[0];
    if (p[0] > bbox[2]) bbox[2] = p[0];
    if (p[1] < bbox[1]) bbox[1] = p[1];
    if (p[1] > bbox[3]) bbox[3] = p[1];
  }
  return bbox;
}