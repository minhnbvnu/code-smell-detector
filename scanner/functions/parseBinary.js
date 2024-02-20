function parseBinary(data) {
  if (data instanceof ArrayBuffer) {
    return new Float32Array(data);
  }
  return null;
}