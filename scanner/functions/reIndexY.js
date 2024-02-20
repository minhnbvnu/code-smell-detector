function reIndexY(y) {
  // transform y to a more traditional scale (puts y=0 in the center
  // of the grid with positive values above and negative values below).
  return (height - 1 - y) - ((height - 1) / 2)
}