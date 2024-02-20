function dedent(state) {
    if (state.scopes.length == 1) { return; }

    state.scopes.shift();
  }