function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        { state.indented = state.lexical.indented; }
      state.lexical = state.lexical.prev;
    }
  }