function normalizeIndex(arrayLength, idx) {
  if (idx < 0) {
    idx = arrayLength + idx
  }
  return idx < 0 || idx >= arrayLength ? null : idx
}