function decodeHexString(text) {
  const buffer = new Uint8Array(text.length / 2);
  for (let i = 0; i < text.length / 2; i++) {
    buffer[i] = parseInt(text.substr(i * 2, 2), 16);
  }
  return new DataView(buffer.buffer);
}