function try_OrderModifier()
  {
    if (l1 == 80                    // 'ascending'
     || l1 == 113)                  // 'descending'
    {
      switch (l1)
      {
      case 80:                      // 'ascending'
        shiftT(80);                 // 'ascending'
        break;
      default:
        shiftT(113);                // 'descending'
      }
    }
    lookahead1W(179);               // S^WS | '(:' | ',' | 'collation' | 'count' | 'empty' | 'for' | 'group' | 'let' |
    if (l1 == 123)                  // 'empty'
    {
      shiftT(123);                  // 'empty'
      lookahead1W(121);             // S^WS | '(:' | 'greatest' | 'least'
      switch (l1)
      {
      case 147:                     // 'greatest'
        shiftT(147);                // 'greatest'
        break;
      default:
        shiftT(173);                // 'least'
      }
    }
    lookahead1W(177);               // S^WS | '(:' | ',' | 'collation' | 'count' | 'for' | 'group' | 'let' | 'order' |
    if (l1 == 94)                   // 'collation'
    {
      shiftT(94);                   // 'collation'
      lookahead1W(15);              // URILiteral | S^WS | '(:'
      shiftT(7);                    // URILiteral
    }
  }