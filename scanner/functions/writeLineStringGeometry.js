function writeLineStringGeometry(geometry, options) {
  return {
    type: 'LineString',
    coordinates: geometry.getCoordinates(),
  };
}