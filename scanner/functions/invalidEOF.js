function invalidEOF() {
    return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
  }