function createBinop(name, binop) {
  return new TokenType(name, {
    beforeExpr,
    binop
  });
}