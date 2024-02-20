function slimTag(stream, state) {
      if (stream.eat('*')) {
        state.tokenize = startRubySplat(slimTagExtras);
        return null;
      }
      if (stream.match(nameRegexp)) {
        state.tokenize = slimTagExtras;
        return "slimTag";
      }
      return slimClass(stream, state);
    }