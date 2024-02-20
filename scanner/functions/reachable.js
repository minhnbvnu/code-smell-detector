function reachable(controlToken) {
    var i = 0, t;
    if (state.tokens.next.id !== ";" || controlToken.inBracelessBlock) {
      return;
    }
    for (;;) {
      do {
        t = peek(i);
        i += 1;
      } while (t.id !== "(end)" && t.id === "(comment)");

      if (t.reach) {
        return;
      }
      if (t.id !== "(endline)") {
        if (t.id === "function") {
          if (state.option.latedef === true) {
            warning("W026", t);
          }
          break;
        }

        warning("W027", t, t.value, controlToken.value);
        break;
      }
    }
  }