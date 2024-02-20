function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) { return pass(); }
    return pass(expression);
  }