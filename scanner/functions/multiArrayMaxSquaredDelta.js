function multiArrayMaxSquaredDelta(
  flatCoordinates,
  offset,
  endss,
  stride,
  max,
) {
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    max = arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max);
    offset = ends[ends.length - 1];
  }
  return max;
}