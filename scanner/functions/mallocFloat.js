function mallocFloat(n) {
  return new Float32Array(mallocArrayBuffer(4*n), 0, n)
}