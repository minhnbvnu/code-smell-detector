function toHaveInnerhtml(actual, expected) {
      const re = '^' + quoteRegexp(expected) + '$';
      return new RegExp(re).test(actual);
    }