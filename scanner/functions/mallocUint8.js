function mallocUint8(n) {
  return new Uint8Array(mallocArrayBuffer(n), 0, n)
}