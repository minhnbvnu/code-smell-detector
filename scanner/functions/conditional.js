function conditional(stream, state) {
    if (stream.match(/^(if|unless|else if|else)\b/)) {
      state.javaScriptLine = true;
      return KEYWORD;
    }
  }