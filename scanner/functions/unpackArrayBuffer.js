function unpackArrayBuffer(value) {
  return (new Uint8Array(value)).buffer;
}