function tokenFollowType(stream, state) {
      if (stream.eatSpace()) {
        return null;
      }

      stream.match(types);
      state.tokenize.pop();
      return "def";
    }