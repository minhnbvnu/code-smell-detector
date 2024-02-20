function parse_IndexDomainExpr()
  {
    eventHandler.startNonterminal("IndexDomainExpr", e0);
    parse_PathExpr();
    eventHandler.endNonterminal("IndexDomainExpr", e0);
  }