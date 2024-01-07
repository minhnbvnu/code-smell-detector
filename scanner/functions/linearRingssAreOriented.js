function linearRingssAreOriented(
  flatCoordinates,
  offset,
  endss,
  stride,
  right,
) {
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    if (!linearRingsAreOriented(flatCoordinates, offset, ends, stride, right)) {
      return false;
    }
    if (ends.length) {
      offset = ends[ends.length - 1];
    }
  }
  return true;
}