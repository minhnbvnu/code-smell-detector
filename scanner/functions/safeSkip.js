function safeSkip(parser, count, callback) {
  if (count === 0) { // parser._skipBytes throws error if count === 0
    callback();
    return;
  }

  parser._skipBytes(count, callback);
}