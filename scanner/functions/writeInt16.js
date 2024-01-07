function writeInt16(dest, offset, num) {
    dest[offset] = num >> 8 & 0xff;
    dest[offset + 1] = num & 0xff;
  }