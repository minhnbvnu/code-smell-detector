function writeSignedInt16(bytes, index, value) {
    bytes[index + 1] = value;
    bytes[index] = value >>> 8;
  }