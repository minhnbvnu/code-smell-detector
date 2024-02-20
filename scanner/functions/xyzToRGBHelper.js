function xyzToRGBHelper(i) {
    if (i <= 0.0031308) {
      return i * 12.92;
    }

    return 1.055 * Math.pow(i, 1 / 2.4) - 0.055;
  }