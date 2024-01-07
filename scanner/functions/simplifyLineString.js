function simplifyLineString(
  flatCoordinates,
  offset,
  end,
  stride,
  squaredTolerance,
  highQuality,
  simplifiedFlatCoordinates,
) {
  simplifiedFlatCoordinates =
    simplifiedFlatCoordinates !== undefined ? simplifiedFlatCoordinates : [];
  if (!highQuality) {
    end = radialDistance(
      flatCoordinates,
      offset,
      end,
      stride,
      squaredTolerance,
      simplifiedFlatCoordinates,
      0,
    );
    flatCoordinates = simplifiedFlatCoordinates;
    offset = 0;
    stride = 2;
  }
  simplifiedFlatCoordinates.length = douglasPeucker(
    flatCoordinates,
    offset,
    end,
    stride,
    squaredTolerance,
    simplifiedFlatCoordinates,
    0,
  );
  return simplifiedFlatCoordinates;
}