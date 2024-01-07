function readMultiPointGeometry(object, scale, translate) {
  const coordinates = object['coordinates'];
  if (scale && translate) {
    for (let i = 0, ii = coordinates.length; i < ii; ++i) {
      transformVertex(coordinates[i], scale, translate);
    }
  }
  return new MultiPoint(coordinates);
}