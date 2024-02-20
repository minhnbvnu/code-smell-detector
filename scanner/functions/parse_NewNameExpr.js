function parse_NewNameExpr()
  {
    eventHandler.startNonterminal("NewNameExpr", e0);
    parse_ExprSingle();
    eventHandler.endNonterminal("NewNameExpr", e0);
  }