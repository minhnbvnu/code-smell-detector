function createRegularPolygon(sides, angle) {
  return function (coordinates, geometry, projection) {
    const center = fromUserCoordinate(
      /** @type {LineCoordType} */ (coordinates)[0],
      projection,
    );
    const end = fromUserCoordinate(
      /** @type {LineCoordType} */ (coordinates)[coordinates.length - 1],
      projection,
    );
    const radius = Math.sqrt(squaredCoordinateDistance(center, end));
    geometry = geometry || fromCircle(new Circle(center), sides);

    let internalAngle = angle;
    if (!angle && angle !== 0) {
      const x = end[0] - center[0];
      const y = end[1] - center[1];
      internalAngle = Math.atan2(y, x);
    }
    makeRegular(
      /** @type {Polygon} */ (geometry),
      center,
      radius,
      internalAngle,
    );

    const userProjection = getUserProjection();
    if (userProjection) {
      geometry.transform(projection, userProjection);
    }
    return geometry;
  };
}