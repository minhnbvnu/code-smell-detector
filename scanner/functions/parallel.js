function parallel(lat, lon1, lon2, projection, squaredTolerance) {
  const epsg4326Projection = getProjection('EPSG:4326');
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function (frac) {
      return [lon1 + (lon2 - lon1) * frac, lat];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance,
  );
}