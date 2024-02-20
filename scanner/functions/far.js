function far(x, y) {
    var i = x / cellSize | 0,
      j = y / cellSize | 0,
      i0 = Math.max(i - 2, 0),
      j0 = Math.max(j - 2, 0),
      i1 = Math.min(i + 3, gridWidth),
      j1 = Math.min(j + 3, gridHeight);

    for (j = j0; j < j1; ++j) {
      var o = j * gridWidth;
      for (i = i0; i < i1; ++i) {
        if (s = grid[o + i]) {
          var s,
            dx = s[0] - x,
            dy = s[1] - y;
          if (dx * dx + dy * dy < radius2) return false;
        }
      }
    }

    return true;
  }