function mallocInt16(n) {
  return new Int16Array(mallocArrayBuffer(2*n), 0, n)
}