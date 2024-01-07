function toLonLat(coordinate, projection) {
  const lonLat = transform(
    coordinate,
    projection !== undefined ? projection : 'EPSG:3857',
    'EPSG:4326',
  );
  const lon = lonLat[0];
  if (lon < -180 || lon > 180) {
    lonLat[0] = modulo(lon + 180, 360) - 180;
  }
  return lonLat;
}