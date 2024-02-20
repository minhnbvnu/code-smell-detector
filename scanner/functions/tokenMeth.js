function tokenMeth(stream, state) {
    if (stream.eatSpace()) {
      return null;
    }
    stream.match(/([a-zA-Z][A-Za-z0-9_]*)|(`.+`)/);
    state.tokenize = tokenBase;
    return "def"
  }