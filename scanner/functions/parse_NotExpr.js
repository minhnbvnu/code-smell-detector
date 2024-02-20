function parse_NotExpr()
  {
    eventHandler.startNonterminal("NotExpr", e0);
    if (l1 == 196)                  // 'not'
    {
      shift(196);                   // 'not'
    }
    lookahead1W(265);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    whitespace();
    parse_ComparisonExpr();
    eventHandler.endNonterminal("NotExpr", e0);
  }