function popInterpolationStack(state) {
    return (state.interpolationStack || (state.interpolationStack = [])).pop();
  }