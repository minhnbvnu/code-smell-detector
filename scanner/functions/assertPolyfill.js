function assertPolyfill(test, message) {
  if (!test) {
    try {
      // attempt to preserve the stack
      throw new Error("assertion failed: " + message);
    } catch(error) {
      setTimeout(function() {
        throw error;
      }, 0);
    }
  }
}