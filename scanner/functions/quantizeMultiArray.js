function quantizeMultiArray(
  flatCoordinates,
  offset,
  endss,
  stride,
  tolerance,
  simplifiedFlatCoordinates,
  simplifiedOffset,
  simplifiedEndss,
) {
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    /** @type {Array<number>} */
    const simplifiedEnds = [];
    simplifiedOffset = quantizeArray(
      flatCoordinates,
      offset,
      ends,
      stride,
      tolerance,
      simplifiedFlatCoordinates,
      simplifiedOffset,
      simplifiedEnds,
    );
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }
  return simplifiedOffset;
}