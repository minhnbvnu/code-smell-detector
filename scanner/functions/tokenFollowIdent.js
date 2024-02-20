function tokenFollowIdent(stream, state) {
      if (stream.eatSpace()) {
        return null;
      }

      if (stream.match(idents)) {
        stream.eat(/[!?]/);
      } else {
        stream.match(operators) || stream.match(conditionalOperators) || stream.match(indexingOperators);
      }
      state.tokenize.pop();
      return "def";
    }