function assert4(condition, message) {
    if (!condition) {
      throw new Error("math.gl assertion ".concat(message));
    }
  }