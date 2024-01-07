function orientLinearRingsArray(
  flatCoordinates,
  offset,
  endss,
  stride,
  right,
) {
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    offset = orientLinearRings(
      flatCoordinates,
      offset,
      endss[i],
      stride,
      right,
    );
  }
  return offset;
}