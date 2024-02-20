function expressionInner(type, noComma) {
    if (cx.state.fatArrowAt == cx.stream.start) {
      var body = noComma ? arrowBodyNoComma : arrowBody;
      if (type == "(") { return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext); }
      else if (type == "variable") { return pass(pushcontext, pattern, expect("=>"), body, popcontext); }
    }

    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
    if (atomicTypes.hasOwnProperty(type)) { return cont(maybeop); }
    if (type == "function") { return cont(functiondef, maybeop); }
    if (type == "class") { return cont(pushlex("form"), classExpression, poplex); }
    if (type == "keyword c" || type == "async") { return cont(noComma ? maybeexpressionNoComma : maybeexpression); }
    if (type == "(") { return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop); }
    if (type == "operator" || type == "spread") { return cont(noComma ? expressionNoComma : expression); }
    if (type == "[") { return cont(pushlex("]"), arrayLiteral, poplex, maybeop); }
    if (type == "{") { return contCommasep(objprop, "}", null, maybeop); }
    if (type == "quasi") { return pass(quasi, maybeop); }
    if (type == "new") { return cont(maybeTarget(noComma)); }
    return cont();
  }