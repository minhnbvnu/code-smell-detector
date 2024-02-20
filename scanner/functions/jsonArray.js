function jsonArray() {
      var t = state.tokens.next;
      advance("[");
      if (state.tokens.next.id !== "]") {
        for (;;) {
          if (state.tokens.next.id === "(end)") {
            error("E027", state.tokens.next, t.line);
          } else if (state.tokens.next.id === "]") {
            warning("W094", state.tokens.curr);
            break;
          } else if (state.tokens.next.id === ",") {
            error("E028", state.tokens.next);
          }
          jsonValue();
          if (state.tokens.next.id !== ",") {
            break;
          }
          advance(",");
        }
      }
      advance("]");
    }