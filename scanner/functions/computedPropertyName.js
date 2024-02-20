function computedPropertyName() {
    advance("[");
    if (!state.inES6()) {
      warning("W119", state.tokens.curr, "computed property names", "6");
    }
    var value = expression(10);
    advance("]");
    return value;
  }