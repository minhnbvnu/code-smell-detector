function getInteriorPointsOfMultiArray(
  flatCoordinates,
  offset,
  endss,
  stride,
  flatCenters,
) {
  /** @type {Array<number>} */
  let interiorPoints = [];
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    interiorPoints = getInteriorPointOfArray(
      flatCoordinates,
      offset,
      ends,
      stride,
      flatCenters,
      2 * i,
      interiorPoints,
    );
    offset = ends[ends.length - 1];
  }
  return interiorPoints;
}