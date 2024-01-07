function getDataView(source) {
  if (typeof source === 'string') {
    return decodeHexString(source);
  }
  if (ArrayBuffer.isView(source)) {
    if (source instanceof DataView) {
      return source;
    }
    return new DataView(source.buffer, source.byteOffset, source.byteLength);
  }
  if (source instanceof ArrayBuffer) {
    return new DataView(source);
  }
  return null;
}