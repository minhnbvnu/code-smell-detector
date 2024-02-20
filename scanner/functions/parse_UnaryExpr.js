function parse_UnaryExpr()
  {
    eventHandler.startNonterminal("UnaryExpr", e0);
    for (;;)
    {
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      if (l1 != 40                  // '+'
       && l1 != 42)                 // '-'
      {
        break;
      }
      switch (l1)
      {
      case 42:                      // '-'
        shift(42);                  // '-'
        break;
      default:
        shift(40);                  // '+'
      }
    }
    whitespace();
    parse_ValueExpr();
    eventHandler.endNonterminal("UnaryExpr", e0);
  }