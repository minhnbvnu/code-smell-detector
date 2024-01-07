function getFlatCoordinatesXY(flatCoords, stride) {
  if (stride === 2) {
    return flatCoords;
  }
  return flatCoords.filter((v, i) => i % stride < 2);
}