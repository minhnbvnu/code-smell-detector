function isBeginOfExpr(prev) {
    return !prev.left && prev.arity !== "unary";
  }