function douglasPeuckerArray(
  flatCoordinates,
  offset,
  ends,
  stride,
  squaredTolerance,
  simplifiedFlatCoordinates,
  simplifiedOffset,
  simplifiedEnds,
) {
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    simplifiedOffset = douglasPeucker(
      flatCoordinates,
      offset,
      end,
      stride,
      squaredTolerance,
      simplifiedFlatCoordinates,
      simplifiedOffset,
    );
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }
  return simplifiedOffset;
}