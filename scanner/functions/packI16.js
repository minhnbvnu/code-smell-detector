function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}