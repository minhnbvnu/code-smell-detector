function addlabel(name, opts) {

    var type  = opts.type;
    var token = opts.token;
    var isblockscoped = opts.isblockscoped;
    if (type === "exception") {
      if (_.has(state.funct["(context)"], name)) {
        if (state.funct[name] !== true && !state.option.node) {
          warning("W002", state.tokens.next, name);
        }
      }
    }

    if (_.has(state.funct, name) && !state.funct["(global)"]) {
      if (state.funct[name] === true) {
        if (state.option.latedef) {
          if ((state.option.latedef === true && _.contains([state.funct[name], type], "unction")) ||
              !_.contains([state.funct[name], type], "unction")) {
            warning("W003", state.tokens.next, name);
          }
        }
      } else {
        if ((!state.option.shadow || _.contains([ "inner", "outer" ], state.option.shadow)) &&
            type !== "exception" || state.funct["(blockscope)"].getlabel(name)) {
          warning("W004", state.tokens.next, name);
        }
      }
    }

    if (state.funct["(context)"] && _.has(state.funct["(context)"], name) && type !== "function") {
      if (state.option.shadow === "outer") {
        warning("W123", state.tokens.next, name);
      }
    }
    if (isblockscoped) {
      state.funct["(blockscope)"].current.add(name, type, state.tokens.curr);
      if (state.funct["(blockscope)"].atTop() && exported[name]) {
        state.tokens.curr.exported = true;
      }
    } else {
      state.funct["(blockscope)"].shadow(name);
      state.funct[name] = type;

      if (token) {
        state.funct["(tokens)"][name] = token;
      }

      if (state.funct["(global)"]) {
        global[name] = state.funct;
        if (_.has(implied, name)) {
          if (state.option.latedef) {
            if ((state.option.latedef === true &&
                _.contains([state.funct[name], type], "unction")) ||
                !_.contains([state.funct[name], type], "unction")) {
              warning("W003", state.tokens.next, name);
            }
          }

          delete implied[name];
        }
      } else {
        scope[name] = state.funct;
      }
    }
  }