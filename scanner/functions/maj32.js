function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}