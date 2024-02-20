function tokenMultiStringReturn(stream, state) {
    state.tokenize = tokenMultiString;
    state.startQuote = '"'
    return tokenMultiString(stream, state);
  }