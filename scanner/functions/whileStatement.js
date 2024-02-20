function whileStatement(stream, state) {
    if (stream.match(/^while\b/)) {
      state.javaScriptLine = true;
      return KEYWORD;
    }
  }