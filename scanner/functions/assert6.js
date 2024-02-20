function assert6(condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  }