function block(stream, state) {
    if (stream.match(/^block\b *(?:(prepend|append)\b)?/)) {
      state.restOfLine = 'variable';
      return KEYWORD;
    }
  }