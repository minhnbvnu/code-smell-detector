function intersectsLinearRingMultiArray(
  flatCoordinates,
  offset,
  endss,
  stride,
  extent,
) {
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    if (
      intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent)
    ) {
      return true;
    }
    offset = ends[ends.length - 1];
  }
  return false;
}