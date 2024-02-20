function mallocUint16(n) {
  return new Uint16Array(mallocArrayBuffer(2*n), 0, n)
}