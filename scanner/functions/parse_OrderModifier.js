function parse_OrderModifier()
  {
    eventHandler.startNonterminal("OrderModifier", e0);
    if (l1 == 80                    // 'ascending'
     || l1 == 113)                  // 'descending'
    {
      switch (l1)
      {
      case 80:                      // 'ascending'
        shift(80);                  // 'ascending'
        break;
      default:
        shift(113);                 // 'descending'
      }
    }
    lookahead1W(179);               // S^WS | '(:' | ',' | 'collation' | 'count' | 'empty' | 'for' | 'group' | 'let' |
    if (l1 == 123)                  // 'empty'
    {
      shift(123);                   // 'empty'
      lookahead1W(121);             // S^WS | '(:' | 'greatest' | 'least'
      switch (l1)
      {
      case 147:                     // 'greatest'
        shift(147);                 // 'greatest'
        break;
      default:
        shift(173);                 // 'least'
      }
    }
    lookahead1W(177);               // S^WS | '(:' | ',' | 'collation' | 'count' | 'for' | 'group' | 'let' | 'order' |
    if (l1 == 94)                   // 'collation'
    {
      shift(94);                    // 'collation'
      lookahead1W(15);              // URILiteral | S^WS | '(:'
      shift(7);                     // URILiteral
    }
    eventHandler.endNonterminal("OrderModifier", e0);
  }