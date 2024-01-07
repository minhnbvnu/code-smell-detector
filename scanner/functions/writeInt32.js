function writeInt32(dest, offset, num) {
    dest[offset] = num >> 24 & 0xff;
    dest[offset + 1] = num >> 16 & 0xff;
    dest[offset + 2] = num >> 8 & 0xff;
    dest[offset + 3] = num & 0xff;
  }