function boundingRectOfPolyline(polyline) {
  polyline = element_object(polyline);
  return boundingRectOfPolygon(polyline);
}