function parse_OrExpr()
  {
    eventHandler.startNonterminal("OrExpr", e0);
    parse_AndExpr();
    for (;;)
    {
      if (l1 != 200)                // 'or'
      {
        break;
      }
      shift(200);                   // 'or'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_AndExpr();
    }
    eventHandler.endNonterminal("OrExpr", e0);
  }