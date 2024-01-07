function writeMultiLineStringGeometry(geometry, options) {
  return {
    type: 'MultiLineString',
    coordinates: geometry.getCoordinates(),
  };
}