function parse_IndexKeyExpr()
  {
    eventHandler.startNonterminal("IndexKeyExpr", e0);
    parse_PathExpr();
    eventHandler.endNonterminal("IndexKeyExpr", e0);
  }