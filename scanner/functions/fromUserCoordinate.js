function fromUserCoordinate(coordinate, destProjection) {
  if (!userProjection) {
    if (
      showCoordinateWarning &&
      !equals(coordinate, [0, 0]) &&
      coordinate[0] >= -180 &&
      coordinate[0] <= 180 &&
      coordinate[1] >= -90 &&
      coordinate[1] <= 90
    ) {
      showCoordinateWarning = false;
      warn(
        'Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.',
      );
    }
    return coordinate;
  }
  return transform(coordinate, userProjection, destProjection);
}