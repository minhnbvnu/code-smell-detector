function closestOnSegmentData(pointCoordinates, segmentData, projection) {
  const geometry = segmentData.geometry;

  if (
    geometry.getType() === 'Circle' &&
    segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX
  ) {
    let circleGeometry = /** @type {import("../geom/Circle.js").default} */ (
      geometry
    );
    const userProjection = getUserProjection();
    if (userProjection) {
      circleGeometry = /** @type {import("../geom/Circle.js").default} */ (
        circleGeometry.clone().transform(userProjection, projection)
      );
    }
    return toUserCoordinate(
      circleGeometry.getClosestPoint(
        fromUserCoordinate(pointCoordinates, projection),
      ),
      projection,
    );
  }
  const coordinate = fromUserCoordinate(pointCoordinates, projection);
  tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
  tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
  return toUserCoordinate(
    closestOnSegment(coordinate, tempSegment),
    projection,
  );
}