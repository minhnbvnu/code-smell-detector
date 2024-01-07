function writePointGeometry(geometry, options) {
  return {
    type: 'Point',
    coordinates: geometry.getCoordinates(),
  };
}