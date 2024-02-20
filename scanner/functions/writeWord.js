function writeWord(value) {
    writeByte((value >> 8) & 0xff);
    writeByte(value & 0xff);
  }