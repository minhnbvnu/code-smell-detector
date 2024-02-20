function nolinebreak(t) {
    t = t || state.tokens.curr;
    if (t.line !== startLine(state.tokens.next)) {
      warning("E022", t, t.value);
    }
  }