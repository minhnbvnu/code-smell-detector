function doCatch() {
      advance("catch");
      advance("(");

      state.funct["(scope)"].stack("catchparams");

      if (checkPunctuators(state.tokens.next, ["[", "{"])) {
        var tokens = destructuringPattern();
        _.each(tokens, function(token) {
          if (token.id) {
            state.funct["(scope)"].addParam(token.id, token, "exception");
          }
        });
      } else if (state.tokens.next.type !== "(identifier)") {
        warning("E030", state.tokens.next, state.tokens.next.value);
      } else {
        state.funct["(scope)"].addParam(identifier(), state.tokens.curr, "exception");
      }

      if (state.tokens.next.value === "if") {
        if (!state.inMoz()) {
          warning("W118", state.tokens.curr, "catch filter");
        }
        advance("if");
        expression(0);
      }

      advance(")");

      block(false);

      state.funct["(scope)"].unstack();
    }