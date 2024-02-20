function writeFloatBE(value, offset) {
  ieee754.write(this, value, offset, false, 23, 4);
}