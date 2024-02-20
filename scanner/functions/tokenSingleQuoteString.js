function tokenSingleQuoteString(stream, state) {
    var ch;
    while ((ch = stream.peek()) != null) {
      stream.next();

      if (ch === "'" && !stream.eat("'")) {
        state.tokenize = tokenBase;
        return 'string';
      }
    }

    return 'error';
  }