function checkPrimitive(primitive) {
    if (!primitive.attributes && Object.keys(primitive.attributes).length > 0) {
      throw new Error("glTF: Empty primitive detected: Draco decompression failure?");
    }
  }