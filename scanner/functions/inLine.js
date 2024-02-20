function inLine(style) {
    return function(stream, state) {
      while(!stream.eol()) {
        stream.next();
      }
      state.tokenize = inText;
      return style;
    };
  }