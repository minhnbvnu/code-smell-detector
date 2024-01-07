function signedInt16(b0, b1) {
    var value = (b0 << 8) + b1;
    return value & 1 << 15 ? value - 0x10000 : value;
  }