function newFraction(n, d) {
      if (d === 0) {
        throw Fraction2["DivisionByZero"];
      }

      var f = Object.create(Fraction2.prototype);
      f["s"] = n < 0 ? -1 : 1;
      n = n < 0 ? -n : n;
      var a2 = gcd2(n, d);
      f["n"] = n / a2;
      f["d"] = d / a2;
      return f;
    }