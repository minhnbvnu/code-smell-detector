function Fraction2(a2, b) {
      parse(a2, b);

      if (this instanceof Fraction2) {
        a2 = gcd2(P["d"], P["n"]);
        this["s"] = P["s"];
        this["n"] = P["n"] / a2;
        this["d"] = P["d"] / a2;
      } else {
        return newFraction(P["s"] * P["n"], P["d"]);
      }
    }