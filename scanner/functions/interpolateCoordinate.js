function interpolateCoordinate(coordinates, index) {
  const count = coordinates.length;

  let startIndex = Math.floor(index);
  const along = index - startIndex;
  if (startIndex >= count) {
    startIndex -= count;
  } else if (startIndex < 0) {
    startIndex += count;
  }

  let endIndex = startIndex + 1;
  if (endIndex >= count) {
    endIndex -= count;
  }

  const start = coordinates[startIndex];
  const x0 = start[0];
  const y0 = start[1];
  const end = coordinates[endIndex];
  const dx = end[0] - x0;
  const dy = end[1] - y0;

  return [x0 + dx * along, y0 + dy * along];
}