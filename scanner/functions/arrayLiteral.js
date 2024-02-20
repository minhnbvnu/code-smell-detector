function arrayLiteral(type) {
    if (type == "]") { return cont(); }
    return pass(commasep(expressionNoComma, "]"));
  }