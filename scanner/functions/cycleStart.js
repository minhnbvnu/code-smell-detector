function cycleStart(n, d, len) {
      var rem1 = 1;
      var rem2 = modpow(10, len, d);

      for (var t = 0; t < 300; t++) {
        if (rem1 === rem2) return t;
        rem1 = rem1 * 10 % d;
        rem2 = rem2 * 10 % d;
      }

      return 0;
    }