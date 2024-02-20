function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}