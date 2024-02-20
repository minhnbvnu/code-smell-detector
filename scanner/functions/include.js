function include(stream, state) {
    if (stream.match(/^include\b/)) {
      state.restOfLine = 'string';
      return KEYWORD;
    }
  }