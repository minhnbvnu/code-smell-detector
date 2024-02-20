function parse_AdditiveExpr()
  {
    eventHandler.startNonterminal("AdditiveExpr", e0);
    parse_MultiplicativeExpr();
    for (;;)
    {
      if (l1 != 40                  // '+'
       && l1 != 42)                 // '-'
      {
        break;
      }
      switch (l1)
      {
      case 40:                      // '+'
        shift(40);                  // '+'
        break;
      default:
        shift(42);                  // '-'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_MultiplicativeExpr();
    }
    eventHandler.endNonterminal("AdditiveExpr", e0);
  }