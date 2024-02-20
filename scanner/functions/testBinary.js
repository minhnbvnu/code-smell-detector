function testBinary(data, byteOffset, loader, test) {
    if (test instanceof ArrayBuffer) {
      return compareArrayBuffers(test, data, test.byteLength);
    }
    switch (typeof test) {
      case "function":
        return test(data, loader);
      case "string":
        const magic = getMagicString2(data, byteOffset, test.length);
        return test === magic;
      default:
        return false;
    }
  }