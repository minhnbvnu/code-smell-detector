function getApplePos() {
    var cell = getRandomInt(0, freeCells.length - 1);
    return {
      x: (cell % numCols) * grid,
      y: ((cell / numCols) | 0) * grid
    };
  }