function caseStatement(stream, state) {
    if (stream.match(/^case\b/)) {
      state.javaScriptLine = true;
      return KEYWORD;
    }
  }