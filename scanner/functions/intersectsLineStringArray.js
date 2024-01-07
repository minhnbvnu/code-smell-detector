function intersectsLineStringArray(
  flatCoordinates,
  offset,
  ends,
  stride,
  extent,
) {
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    if (
      intersectsLineString(flatCoordinates, offset, ends[i], stride, extent)
    ) {
      return true;
    }
    offset = ends[i];
  }
  return false;
}