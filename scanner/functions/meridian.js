function meridian(lon, lat1, lat2, projection, squaredTolerance) {
  const epsg4326Projection = getProjection('EPSG:4326');
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function (frac) {
      return [lon, lat1 + (lat2 - lat1) * frac];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance,
  );
}