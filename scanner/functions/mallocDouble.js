function mallocDouble(n) {
  return new Float64Array(mallocArrayBuffer(8*n), 0, n)
}