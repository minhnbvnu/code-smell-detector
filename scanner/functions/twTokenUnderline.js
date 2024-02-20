function twTokenUnderline(stream, state) {
    var maybeEnd = false,
    ch;
    while (ch = stream.next()) {
      if (ch == "_" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "_");
    }
    return "underlined";
  }