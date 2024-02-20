function cycleLen(n, d) {
      for (; d % 2 === 0; d /= 2) {}

      for (; d % 5 === 0; d /= 5) {}

      if (d === 1) return 0;
      var rem = 10 % d;
      var t = 1;

      for (; rem !== 1; t++) {
        rem = rem * 10 % d;
        if (t > MAX_CYCLE_LEN) return 0;
      }

      return t;
    }