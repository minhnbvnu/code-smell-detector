function buffer2String(b) {
  const utf8decoder = new TextDecoder();
  return utf8decoder.decode(new Uint8Array(b));
}