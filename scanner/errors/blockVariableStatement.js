function blockVariableStatement(type, statement, context) {

    var prefix = context && context.prefix;
    var inexport = context && context.inexport;
    var isLet = type === "let";
    var isConst = type === "const";
    var tokens, lone, value, letblock;

    if (!state.inES6()) {
      warning("W104", state.tokens.curr, type, "6");
    }

    if (isLet && state.tokens.next.value === "(") {
      if (!state.inMoz()) {
        warning("W118", state.tokens.next, "let block");
      }
      advance("(");
      state.funct["(scope)"].stack();
      letblock = true;
    } else if (state.funct["(noblockscopedvar)"]) {
      error("E048", state.tokens.curr, isConst ? "Const" : "Let");
    }

    statement.first = [];
    for (;;) {
      var names = [];
      if (_.contains(["{", "["], state.tokens.next.value)) {
        tokens = destructuringPattern();
        lone = false;
      } else {
        tokens = [ { id: identifier(), token: state.tokens.curr } ];
        lone = true;
      }

      if (!prefix && isConst && state.tokens.next.id !== "=") {
        warning("E012", state.tokens.curr, state.tokens.curr.value);
      }

      for (var t in tokens) {
        if (tokens.hasOwnProperty(t)) {
          t = tokens[t];
          if (state.funct["(scope)"].block.isGlobal()) {
            if (predefined[t.id] === false) {
              warning("W079", t.token, t.id);
            }
          }
          if (t.id && !state.funct["(noblockscopedvar)"]) {
            state.funct["(scope)"].addlabel(t.id, {
              type: type,
              token: t.token });
            names.push(t.token);

            if (lone && inexport) {
              state.funct["(scope)"].setExported(t.token.value, t.token);
            }
          }
        }
      }

      if (state.tokens.next.id === "=") {
        advance("=");
        if (!prefix && state.tokens.next.id === "undefined") {
          warning("W080", state.tokens.prev, state.tokens.prev.value);
        }
        if (!prefix && peek(0).id === "=" && state.tokens.next.identifier) {
          warning("W120", state.tokens.next, state.tokens.next.value);
        }
        value = expression(prefix ? 120 : 10);
        if (lone) {
          tokens[0].first = value;
        } else {
          destructuringPatternMatch(names, value);
        }
      }

      statement.first = statement.first.concat(names);

      if (state.tokens.next.id !== ",") {
        break;
      }
      comma();
    }
    if (letblock) {
      advance(")");
      block(true, true);
      statement.block = true;
      state.funct["(scope)"].unstack();
    }

    return statement;
  }