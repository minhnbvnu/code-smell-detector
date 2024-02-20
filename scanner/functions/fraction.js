function fraction(ts, frac, fromUnit, toUnit, conversion, digits) {
      if (ts[fromUnit] >= 0) {
        frac += ts[fromUnit];
        delete ts[fromUnit];
      }

      frac /= conversion;
      if (frac + 1 <= 1) {
        // drop if below machine epsilon
        return 0;
      }

      if (ts[toUnit] >= 0) {
        // ensure does not have more than specified number of digits
        ts[toUnit] = +(ts[toUnit] + frac).toFixed(digits);
        rippleRounded(ts, toUnit);
        return 0;
      }

      return frac;
    }