function mallocDataView(n) {
  return new DataView(mallocArrayBuffer(n), 0, n)
}