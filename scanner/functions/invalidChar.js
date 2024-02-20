function invalidChar(c) {
    if (c === undefined) {
      return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
    }

    return syntaxError("JSON5: invalid character '" + formatChar(c) + "' at " + line + ":" + column);
  }