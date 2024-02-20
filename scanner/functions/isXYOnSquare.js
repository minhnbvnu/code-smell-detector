function isXYOnSquare(x, y) {
  for (var i in SQUARE_ELS_OFFSETS) {
    if (SQUARE_ELS_OFFSETS.hasOwnProperty(i) !== true) continue;

    var s = SQUARE_ELS_OFFSETS[i];
    if (x >= s.left && x < s.left + SQUARE_SIZE &&
        y >= s.top && y < s.top + SQUARE_SIZE) {
      return i;
    }
  }

  return 'offboard';
}