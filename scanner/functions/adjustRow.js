function adjustRow(from, cols, by) {
    for (let i = from; i < from + cols; i++) {
      spaceTracker[i] = Math.max(spaceTracker[i] + by, 0);
    }
  }