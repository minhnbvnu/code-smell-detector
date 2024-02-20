function clamp0to255(a) {
    return a <= 0 ? 0 : a >= 255 ? 255 : a;
  }