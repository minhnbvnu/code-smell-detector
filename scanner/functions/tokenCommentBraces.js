function tokenCommentBraces(stream, state) {
    var ch;
    while (ch = stream.next()) {
      if (ch == "}") {
        state.tokenize = null;
        break;
      }
    }
    return "comment";
  }