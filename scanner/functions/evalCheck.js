function evalCheck(code) {
      try {
        return !!eval(code);
      } catch (ignored) {
        return false;
      }
    }