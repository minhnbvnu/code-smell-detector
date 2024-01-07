function createBox() {
  return function (coordinates, geometry, projection) {
    const extent = boundingExtent(
      /** @type {LineCoordType} */ ([
        coordinates[0],
        coordinates[coordinates.length - 1],
      ]).map(function (coordinate) {
        return fromUserCoordinate(coordinate, projection);
      }),
    );
    const boxCoordinates = [
      [
        getBottomLeft(extent),
        getBottomRight(extent),
        getTopRight(extent),
        getTopLeft(extent),
        getBottomLeft(extent),
      ],
    ];
    if (geometry) {
      geometry.setCoordinates(boxCoordinates);
    } else {
      geometry = new Polygon(boxCoordinates);
    }
    const userProjection = getUserProjection();
    if (userProjection) {
      geometry.transform(projection, userProjection);
    }
    return geometry;
  };
}