function pushInterpolationStack(state) {
    (state.interpolationStack || (state.interpolationStack = [])).push(state.tokenize);
  }