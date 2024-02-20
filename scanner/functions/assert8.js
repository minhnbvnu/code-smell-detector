function assert8(condition, message) {
    if (!condition) {
      throw new Error(`math.gl assertion failed. ${message}`);
    }
  }