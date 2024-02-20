function assert9(condition, message) {
    if (!condition) {
      throw new Error(message || "assert failed: gltf");
    }
  }