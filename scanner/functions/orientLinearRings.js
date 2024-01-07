function orientLinearRings(
  flatCoordinates,
  offset,
  ends,
  stride,
  right,
) {
  right = right !== undefined ? right : false;
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    const isClockwise = linearRingIsClockwise(
      flatCoordinates,
      offset,
      end,
      stride,
    );
    const reverse =
      i === 0
        ? (right && isClockwise) || (!right && !isClockwise)
        : (right && !isClockwise) || (!right && isClockwise);
    if (reverse) {
      reverseCoordinates(flatCoordinates, offset, end, stride);
    }
    offset = end;
  }
  return offset;
}