function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}