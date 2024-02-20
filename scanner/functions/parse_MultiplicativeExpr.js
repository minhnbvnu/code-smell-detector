function parse_MultiplicativeExpr()
  {
    eventHandler.startNonterminal("MultiplicativeExpr", e0);
    parse_UnionExpr();
    for (;;)
    {
      if (l1 != 38                  // '*'
       && l1 != 118                 // 'div'
       && l1 != 151                 // 'idiv'
       && l1 != 180)                // 'mod'
      {
        break;
      }
      switch (l1)
      {
      case 38:                      // '*'
        shift(38);                  // '*'
        break;
      case 118:                     // 'div'
        shift(118);                 // 'div'
        break;
      case 151:                     // 'idiv'
        shift(151);                 // 'idiv'
        break;
      default:
        shift(180);                 // 'mod'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_UnionExpr();
    }
    eventHandler.endNonterminal("MultiplicativeExpr", e0);
  }