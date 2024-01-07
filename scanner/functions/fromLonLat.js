function fromLonLat(coordinate, projection) {
  disableCoordinateWarning();
  return transform(
    coordinate,
    'EPSG:4326',
    projection !== undefined ? projection : 'EPSG:3857',
  );
}