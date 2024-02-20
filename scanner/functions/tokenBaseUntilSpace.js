function tokenBaseUntilSpace() {
    function t(stream, state) {
      if (stream.eat(/[\w]/)) {
        var isWord = stream.eatWhile(/[\w]/);
        if (isWord) {
          state.tokenize.pop();
          return "word";
        }
      }
      state.tokenize.pop();
      return "string";
    }

    t.isBase = true;
    return t;
  }