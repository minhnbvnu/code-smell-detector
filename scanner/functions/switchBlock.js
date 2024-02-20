function switchBlock(stream, state, f) {
    state.f = state.block = f;
    return f(stream, state);
  }