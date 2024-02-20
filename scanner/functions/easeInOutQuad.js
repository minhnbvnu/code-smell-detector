function easeInOutQuad(t) {
      t = t * 2;
      if (t < 1) {
        return 0.5 * t * t;
      }
      return -((t - 1) * (t - 3) - 1) / 2;
    }