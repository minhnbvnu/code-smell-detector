function inflateCoordinatesArray(
  flatCoordinates,
  offset,
  ends,
  stride,
  coordinatess,
) {
  coordinatess = coordinatess !== undefined ? coordinatess : [];
  let i = 0;
  for (let j = 0, jj = ends.length; j < jj; ++j) {
    const end = ends[j];
    coordinatess[i++] = inflateCoordinates(
      flatCoordinates,
      offset,
      end,
      stride,
      coordinatess[i],
    );
    offset = end;
  }
  coordinatess.length = i;
  return coordinatess;
}