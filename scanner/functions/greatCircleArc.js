function greatCircleArc(
  lon1,
  lat1,
  lon2,
  lat2,
  projection,
  squaredTolerance,
) {
  const geoProjection = getProjection('EPSG:4326');

  const cosLat1 = Math.cos(toRadians(lat1));
  const sinLat1 = Math.sin(toRadians(lat1));
  const cosLat2 = Math.cos(toRadians(lat2));
  const sinLat2 = Math.sin(toRadians(lat2));
  const cosDeltaLon = Math.cos(toRadians(lon2 - lon1));
  const sinDeltaLon = Math.sin(toRadians(lon2 - lon1));
  const d = sinLat1 * sinLat2 + cosLat1 * cosLat2 * cosDeltaLon;

  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function (frac) {
      if (1 <= d) {
        return [lon2, lat2];
      }
      const D = frac * Math.acos(d);
      const cosD = Math.cos(D);
      const sinD = Math.sin(D);
      const y = sinDeltaLon * cosLat2;
      const x = cosLat1 * sinLat2 - sinLat1 * cosLat2 * cosDeltaLon;
      const theta = Math.atan2(y, x);
      const lat = Math.asin(sinLat1 * cosD + cosLat1 * sinD * Math.cos(theta));
      const lon =
        toRadians(lon1) +
        Math.atan2(
          Math.sin(theta) * sinD * cosLat1,
          cosD - sinLat1 * Math.sin(lat),
        );
      return [toDegrees(lon), toDegrees(lat)];
    },
    getTransform(geoProjection, projection),
    squaredTolerance,
  );
}