function maybeoperatorNoComma(type, value, noComma) {
    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
    var expr = noComma == false ? expression : expressionNoComma;
    if (type == "=>") { return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext); }
    if (type == "operator") {
      if (/\+\+|--/.test(value)) { return cont(me); }
      if (value == "?") { return cont(expression, expect(":"), expr); }
      return cont(expr);
    }
    if (type == "quasi") { return pass(quasi, me); }
    if (type == ";") { return; }
    if (type == "(") { return contCommasep(expressionNoComma, ")", "call", me); }
    if (type == ".") { return cont(property, me); }
    if (type == "[") { return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me); }
  }