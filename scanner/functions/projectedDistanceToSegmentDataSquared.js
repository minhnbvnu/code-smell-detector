function projectedDistanceToSegmentDataSquared(
  pointCoordinates,
  segmentData,
  projection,
) {
  const geometry = segmentData.geometry;

  if (geometry.getType() === 'Circle') {
    let circleGeometry = /** @type {import("../geom/Circle.js").default} */ (
      geometry
    );

    if (segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX) {
      const userProjection = getUserProjection();
      if (userProjection) {
        circleGeometry = /** @type {import("../geom/Circle.js").default} */ (
          circleGeometry.clone().transform(userProjection, projection)
        );
      }
      const distanceToCenterSquared = squaredCoordinateDistance(
        circleGeometry.getCenter(),
        fromUserCoordinate(pointCoordinates, projection),
      );
      const distanceToCircumference =
        Math.sqrt(distanceToCenterSquared) - circleGeometry.getRadius();
      return distanceToCircumference * distanceToCircumference;
    }
  }

  const coordinate = fromUserCoordinate(pointCoordinates, projection);
  tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
  tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
  return squaredDistanceToSegment(coordinate, tempSegment);
}