function readHereDoc(phrase, mayIndent) {
    return function(stream, state) {
      if (mayIndent) stream.eatSpace()
      if (stream.match(phrase)) state.tokenize.pop();
      else stream.skipToEnd();
      return "string";
    };
  }