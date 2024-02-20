function maybeexpressionNoComma(type) {
    if (type.match(/[;\}\)\],]/)) { return pass(); }
    return pass(expressionNoComma);
  }