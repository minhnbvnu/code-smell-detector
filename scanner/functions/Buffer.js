function buffer(size, num, dest) {
  if (dest === undefined) {
    dest = [0, 0];
  }
  dest[0] = size[0] + 2 * num;
  dest[1] = size[1] + 2 * num;
  return dest;
}