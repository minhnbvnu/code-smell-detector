function jsonObject() {
      var o = {}, t = state.tokens.next;
      advance("{");
      if (state.tokens.next.id !== "}") {
        for (;;) {
          if (state.tokens.next.id === "(end)") {
            error("E026", state.tokens.next, t.line);
          } else if (state.tokens.next.id === "}") {
            warning("W094", state.tokens.curr);
            break;
          } else if (state.tokens.next.id === ",") {
            error("E028", state.tokens.next);
          } else if (state.tokens.next.id !== "(string)") {
            warning("W095", state.tokens.next, state.tokens.next.value);
          }
          if (o[state.tokens.next.value] === true) {
            warning("W075", state.tokens.next, "key", state.tokens.next.value);
          } else if ((state.tokens.next.value === "__proto__" &&
            !state.option.proto) || (state.tokens.next.value === "__iterator__" &&
            !state.option.iterator)) {
            warning("W096", state.tokens.next, state.tokens.next.value);
          } else {
            o[state.tokens.next.value] = true;
          }
          advance();
          advance(":");
          jsonValue();
          if (state.tokens.next.id !== ",") {
            break;
          }
          advance(",");
        }
      }
      advance("}");
    }