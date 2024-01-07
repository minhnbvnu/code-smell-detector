function douglasPeuckerMultiArray(
  flatCoordinates,
  offset,
  endss,
  stride,
  squaredTolerance,
  simplifiedFlatCoordinates,
  simplifiedOffset,
  simplifiedEndss,
) {
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    /** @type {Array<number>} */
    const simplifiedEnds = [];
    simplifiedOffset = douglasPeuckerArray(
      flatCoordinates,
      offset,
      ends,
      stride,
      squaredTolerance,
      simplifiedFlatCoordinates,
      simplifiedOffset,
      simplifiedEnds,
    );
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }
  return simplifiedOffset;
}