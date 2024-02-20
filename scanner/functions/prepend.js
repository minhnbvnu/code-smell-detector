function prepend(stream, state) {
    if (stream.match(/^prepend\b/)) {
      state.restOfLine = 'variable';
      return KEYWORD;
    }
  }