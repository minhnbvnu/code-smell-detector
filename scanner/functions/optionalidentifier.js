function optionalidentifier(fnparam, prop, preserve) {
    if (!state.tokens.next.identifier) {
      return;
    }

    if (!preserve) {
      advance();
    }

    var curr = state.tokens.curr;
    var val  = state.tokens.curr.value;

    if (!isReserved(curr)) {
      return val;
    }

    if (prop) {
      if (state.inES5()) {
        return val;
      }
    }

    if (fnparam && val === "undefined") {
      return val;
    }

    warning("W024", state.tokens.curr, state.tokens.curr.id);
    return val;
  }