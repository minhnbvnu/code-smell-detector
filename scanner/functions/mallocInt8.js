function mallocInt8(n) {
  return new Int8Array(mallocArrayBuffer(n), 0, n)
}