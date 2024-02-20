function writeDoubleBE(value, offset) {
  ieee754.write(this, value, offset, false, 52, 8);
}