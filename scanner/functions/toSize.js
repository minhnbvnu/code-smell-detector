function toSize(size, dest) {
  if (Array.isArray(size)) {
    return size;
  }
  if (dest === undefined) {
    dest = [size, size];
  } else {
    dest[0] = size;
    dest[1] = size;
  }
  return dest;
}