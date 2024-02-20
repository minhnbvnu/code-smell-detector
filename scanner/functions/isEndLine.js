function isEndLine(stream) {
    return !stream.peek() || stream.match(/\s+$/, false);
  }