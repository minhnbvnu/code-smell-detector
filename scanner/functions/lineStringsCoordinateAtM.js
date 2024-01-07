function lineStringsCoordinateAtM(
  flatCoordinates,
  offset,
  ends,
  stride,
  m,
  extrapolate,
  interpolate,
) {
  if (interpolate) {
    return lineStringCoordinateAtM(
      flatCoordinates,
      offset,
      ends[ends.length - 1],
      stride,
      m,
      extrapolate,
    );
  }
  let coordinate;
  if (m < flatCoordinates[stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(0, stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  if (flatCoordinates[flatCoordinates.length - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    if (offset == end) {
      continue;
    }
    if (m < flatCoordinates[offset + stride - 1]) {
      return null;
    }
    if (m <= flatCoordinates[end - 1]) {
      return lineStringCoordinateAtM(
        flatCoordinates,
        offset,
        end,
        stride,
        m,
        false,
      );
    }
    offset = end;
  }
  return null;
}