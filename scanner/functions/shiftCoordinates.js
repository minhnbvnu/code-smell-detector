function shiftCoordinates(x, y) {
  const newX = (width - x) - (width / 2);
  const newY = (height - 1 - y) - ((height - 1) / 2);
  return [newX, newY];
}