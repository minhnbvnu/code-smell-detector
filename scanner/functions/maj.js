function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}