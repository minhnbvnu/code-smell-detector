function easeInOutCubic(t, c) {
    t /= c / 2;
    if (t < 1) return 1 / 2 * t * t * t;
    t -= 2;
    return 1 / 2 * (t * t * t + 2);
  }