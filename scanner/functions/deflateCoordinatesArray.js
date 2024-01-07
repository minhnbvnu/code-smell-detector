function deflateCoordinatesArray(
  flatCoordinates,
  offset,
  coordinatess,
  stride,
  ends,
) {
  ends = ends ? ends : [];
  let i = 0;
  for (let j = 0, jj = coordinatess.length; j < jj; ++j) {
    const end = deflateCoordinates(
      flatCoordinates,
      offset,
      coordinatess[j],
      stride,
    );
    ends[i++] = end;
    offset = end;
  }
  ends.length = i;
  return ends;
}