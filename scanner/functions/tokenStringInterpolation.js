function tokenStringInterpolation(stream, state) {
    return tokenInterpolation(stream, state, tokenDoubleQuoteString);
  }