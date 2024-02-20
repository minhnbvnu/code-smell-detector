function tokenVariableWithBraces(stream, state) {
    var ch;
    while ((ch = stream.next()) != null) {
      if (ch === '}') {
        state.tokenize = tokenBase;
        break;
      }
    }
    return 'variable-2';
  }