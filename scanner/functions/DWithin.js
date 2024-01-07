function dwithin(geometryName, geometry, distance, unit, srsName) {
  return new DWithin(geometryName, geometry, distance, unit, srsName);
}