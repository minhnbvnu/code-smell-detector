function padToNBytes(byteLength, padding) {
    assert2(byteLength >= 0);
    assert2(padding > 0);
    return byteLength + (padding - 1) & ~(padding - 1);
  }