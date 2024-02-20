function rgbToXYZHelper(i) {
    if (i <= 0.04045) {
      return i / 12.92;
    }

    return Math.pow((i + 0.055) / 1.055, 2.4);
  }