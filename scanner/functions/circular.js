function circular(center, radius, n, sphereRadius) {
  n = n ? n : 32;
  /** @type {Array<number>} */
  const flatCoordinates = [];
  for (let i = 0; i < n; ++i) {
    extend(
      flatCoordinates,
      sphereOffset(center, radius, (2 * Math.PI * i) / n, sphereRadius),
    );
  }
  flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
  return new Polygon(flatCoordinates, 'XY', [flatCoordinates.length]);
}