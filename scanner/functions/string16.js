function string16(value) {
    return String.fromCharCode(value >> 8 & 0xff, value & 0xff);
  }