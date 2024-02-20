function invalidIdentifier() {
    column -= 5;
    return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
  }