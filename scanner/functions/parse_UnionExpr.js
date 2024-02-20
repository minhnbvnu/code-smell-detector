function parse_UnionExpr()
  {
    eventHandler.startNonterminal("UnionExpr", e0);
    parse_IntersectExceptExpr();
    for (;;)
    {
      if (l1 != 254                 // 'union'
       && l1 != 279)                // '|'
      {
        break;
      }
      switch (l1)
      {
      case 254:                     // 'union'
        shift(254);                 // 'union'
        break;
      default:
        shift(279);                 // '|'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_IntersectExceptExpr();
    }
    eventHandler.endNonterminal("UnionExpr", e0);
  }