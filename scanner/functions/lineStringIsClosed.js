function lineStringIsClosed(flatCoordinates, offset, end, stride) {
  const lastCoord = end - stride;
  if (
    flatCoordinates[offset] === flatCoordinates[lastCoord] &&
    flatCoordinates[offset + 1] === flatCoordinates[lastCoord + 1] &&
    (end - offset) / stride > 3
  ) {
    return !!linearRingArea(flatCoordinates, offset, end, stride);
  }
  return false;
}