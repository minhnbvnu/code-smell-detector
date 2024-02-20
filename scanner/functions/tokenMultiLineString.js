function tokenMultiLineString(stream, state)
  {
    state._multiLineString = true;
    // the first line is special it may contain a comment
    if (!stream.sol()) {
      stream.eatSpace();

      if (stream.peek() == "#") {
        stream.skipToEnd();
        return "comment";
      }

      stream.skipToEnd();
      return "string";
    }

    if ((stream.next() == ".")  && (stream.eol()))
    {
      state._multiLineString = false;
      state.tokenize = tokenBase;
    }

    return "string";
  }