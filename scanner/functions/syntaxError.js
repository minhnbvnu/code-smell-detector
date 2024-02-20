function syntaxError(message) {
    var err = new SyntaxError(message);
    err.lineNumber = line;
    err.columnNumber = column;
    return err;
  }