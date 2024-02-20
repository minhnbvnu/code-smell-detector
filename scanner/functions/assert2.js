function assert2(condition, message) {
    if (!condition) {
      throw new Error(message || "loader assertion failed.");
    }
  }