function substituteZCoordinate(points, zValue) {
  return points.map(point => [...point, zValue]);
}