function parse_AndExpr()
  {
    eventHandler.startNonterminal("AndExpr", e0);
    parse_ComparisonExpr();
    for (;;)
    {
      if (l1 != 75)                 // 'and'
      {
        break;
      }
      shift(75);                    // 'and'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_ComparisonExpr();
    }
    eventHandler.endNonterminal("AndExpr", e0);
  }