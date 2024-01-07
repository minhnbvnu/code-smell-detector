function verifyBrokenDiagonalRendering(data, offset) {
  // the values ought to be close to the rgba(210, 0, 0, 0.75)
  return (
    Math.abs(data[offset * 4] - 210) > 2 ||
    Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2
  );
}