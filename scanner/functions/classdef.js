function classdef(isStatement) {
    if (!state.inES6()) {
      warning("W104", state.tokens.curr, "class", "6");
    }
    if (isStatement) {
      this.name = identifier();

      state.funct["(scope)"].addlabel(this.name, {
        type: "class",
        token: state.tokens.curr });
    } else if (state.tokens.next.identifier && state.tokens.next.value !== "extends") {
      this.name = identifier();
      this.namedExpr = true;
    } else {
      this.name = state.nameStack.infer();
    }
    classtail(this);
    return this;
  }