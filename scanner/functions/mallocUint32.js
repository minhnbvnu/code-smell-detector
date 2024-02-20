function mallocUint32(n) {
  return new Uint32Array(mallocArrayBuffer(4*n), 0, n)
}