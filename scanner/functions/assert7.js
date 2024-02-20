function assert7(condition, message) {
    if (!condition) {
      throw new Error(message || "loader assertion failed.");
    }
  }