function afterprop(type) {
    if (type == ":") { return cont(expressionNoComma); }
    if (type == "(") { return pass(functiondef); }
  }