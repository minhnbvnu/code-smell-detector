function assert3(condition, message) {
    if (!condition) {
      throw new Error(message || "loaders.gl assertion failed.");
    }
  }