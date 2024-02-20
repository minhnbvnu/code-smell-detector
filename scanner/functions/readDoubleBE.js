function readDoubleBE(start) {
  return ieee754.read(this, start, false, 52, 8);
}