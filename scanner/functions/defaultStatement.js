function defaultStatement(stream) {
    if (stream.match(/^default\b/)) {
      return KEYWORD;
    }
  }