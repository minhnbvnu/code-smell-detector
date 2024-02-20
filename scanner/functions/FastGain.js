function FastGain(g, x) {
        return (x < 0.5) ?
          FastBias(1.0 - g, 2.0 * x) * 0.5 :
          1.0 - FastBias(1.0 - g, 2.0 - 2.0 * x) * 0.5;
      }