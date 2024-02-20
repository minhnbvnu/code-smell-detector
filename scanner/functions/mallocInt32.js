function mallocInt32(n) {
  return new Int32Array(mallocArrayBuffer(4*n), 0, n)
}