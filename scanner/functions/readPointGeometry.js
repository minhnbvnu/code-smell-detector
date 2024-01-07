function readPointGeometry(object, scale, translate) {
  const coordinates = object['coordinates'];
  if (scale && translate) {
    transformVertex(coordinates, scale, translate);
  }
  return new Point(coordinates);
}