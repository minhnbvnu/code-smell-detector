function boundingRectOfPolygon(polygon) {
  polygon = element_object(polygon);

  var points = polygon.points.trim().replace(/\r\n|\n|\r/gm, ',').replace(/\s+/g, ',').split(',').map(parseFloat);

  var l = Number.POSITIVE_INFINITY;
  var r = Number.NEGATIVE_INFINITY;
  var t = Number.POSITIVE_INFINITY;
  var b = Number.NEGATIVE_INFINITY;

  for (var i = 0; i < points.length; i += 2) {
    if (l > points[i]) l = points[i];
    if (r < points[i]) r = points[i];
    if (t > points[i + 1]) t = points[i + 1];
    if (b < points[i + 1]) b = points[i + 1];
  }

  return {
    left: l,
    top: t,
    right: r,
    bottom: b,
    width: r - l,
    height: b - t
  };
}