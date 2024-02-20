function peg$buildStructuredError(expected, found, location2) {
    return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location2);
  }