function adjustColors(matrix, adjustR, adjustG, adjustB) {
      adjustR = clamp$1(adjustR, 0, 2);
      adjustG = clamp$1(adjustG, 0, 2);
      adjustB = clamp$1(adjustB, 0, 2);
      return multiply(matrix, [
        adjustR,
        0,
        0,
        0,
        0,
        0,
        adjustG,
        0,
        0,
        0,
        0,
        0,
        adjustB,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    }