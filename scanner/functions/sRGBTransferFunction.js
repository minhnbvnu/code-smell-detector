function sRGBTransferFunction(color) {
    if (color <= 0.0031308) {
      return adjustToRange(0, 1, 12.92 * color);
    }

    if (color >= 0.99554525) {
      return 1;
    }

    return adjustToRange(0, 1, (1 + 0.055) * color ** (1 / 2.4) - 0.055);
  }