function switchInline(stream, state, f) {
    state.f = state.inline = f;
    return f(stream, state);
  }