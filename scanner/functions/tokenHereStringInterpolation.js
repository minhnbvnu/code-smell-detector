function tokenHereStringInterpolation(stream, state) {
    return tokenInterpolation(stream, state, tokenMultiStringReturn);
  }