function inflateMultiCoordinatesArray(
  flatCoordinates,
  offset,
  endss,
  stride,
  coordinatesss,
) {
  coordinatesss = coordinatesss !== undefined ? coordinatesss : [];
  let i = 0;
  for (let j = 0, jj = endss.length; j < jj; ++j) {
    const ends = endss[j];
    coordinatesss[i++] =
      ends.length === 1 && ends[0] === offset
        ? []
        : inflateCoordinatesArray(
            flatCoordinates,
            offset,
            ends,
            stride,
            coordinatesss[i],
          );
    offset = ends[ends.length - 1];
  }
  coordinatesss.length = i;
  return coordinatesss;
}