function makeMeshAttributeMetadata(attribute) {
    const result = new Map();
    if ("byteOffset" in attribute) {
      result.set("byteOffset", attribute.byteOffset.toString(10));
    }
    if ("byteStride" in attribute) {
      result.set("byteStride", attribute.byteStride.toString(10));
    }
    if ("normalized" in attribute) {
      result.set("normalized", attribute.normalized.toString());
    }
    return result;
  }