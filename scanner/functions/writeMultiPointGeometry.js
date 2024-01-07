function writeMultiPointGeometry(geometry, options) {
  return {
    type: 'MultiPoint',
    coordinates: geometry.getCoordinates(),
  };
}