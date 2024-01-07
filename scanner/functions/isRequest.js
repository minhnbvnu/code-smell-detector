function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}