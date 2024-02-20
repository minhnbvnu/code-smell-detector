function assert5(condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  }