function functionparams(options) {
    var next;
    var paramsIds = [];
    var ident;
    var tokens = [];
    var t;
    var pastDefault = false;
    var pastRest = false;
    var arity = 0;
    var loneArg = options && options.loneArg;

    if (loneArg && loneArg.identifier === true) {
      state.funct["(scope)"].addParam(loneArg.value, loneArg);
      return { arity: 1, params: [ loneArg.value ] };
    }

    next = state.tokens.next;

    if (!options || !options.parsedOpening) {
      advance("(");
    }

    if (state.tokens.next.id === ")") {
      advance(")");
      return;
    }

    function addParam(addParamArgs) {
      state.funct["(scope)"].addParam.apply(state.funct["(scope)"], addParamArgs);
    }

    for (;;) {
      arity++;
      var currentParams = [];

      if (_.contains(["{", "["], state.tokens.next.id)) {
        tokens = destructuringPattern();
        for (t in tokens) {
          t = tokens[t];
          if (t.id) {
            paramsIds.push(t.id);
            currentParams.push([t.id, t.token]);
          }
        }
      } else {
        if (checkPunctuator(state.tokens.next, "...")) pastRest = true;
        ident = identifier(true);
        if (ident) {
          paramsIds.push(ident);
          currentParams.push([ident, state.tokens.curr]);
        } else {
          while (!checkPunctuators(state.tokens.next, [",", ")"])) advance();
        }
      }
      if (pastDefault) {
        if (state.tokens.next.id !== "=") {
          error("W138", state.tokens.current);
        }
      }
      if (state.tokens.next.id === "=") {
        if (!state.inES6()) {
          warning("W119", state.tokens.next, "default parameters", "6");
        }
        advance("=");
        pastDefault = true;
        expression(10);
      }
      currentParams.forEach(addParam);

      if (state.tokens.next.id === ",") {
        if (pastRest) {
          warning("W131", state.tokens.next);
        }
        comma();
      } else {
        advance(")", next);
        return { arity: arity, params: paramsIds };
      }
    }
  }