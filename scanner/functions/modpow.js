function modpow(b, e, m) {
      var r2 = 1;

      for (; e > 0; b = b * b % m, e >>= 1) {
        if (e & 1) {
          r2 = r2 * b % m;
        }
      }

      return r2;
    }