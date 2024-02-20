function parenExpr(type) {
    if (type != "(") { return pass() }
    return cont(pushlex(")"), expression, expect(")"), poplex)
  }