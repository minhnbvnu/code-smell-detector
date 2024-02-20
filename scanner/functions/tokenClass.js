function tokenClass(stream, state) {
    if (stream.eatSpace()) {
      return null;
    }
    stream.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)/);
    state.tokenize = tokenBase;
    return "variable-3"
  }