function try_FTLiteralRange()
  {
    switch (l1)
    {
    case 130:                       // 'exactly'
      shiftT(130);                  // 'exactly'
      lookahead1W(16);              // IntegerLiteral | S^WS | '(:'
      shiftT(8);                    // IntegerLiteral
      break;
    case 81:                        // 'at'
      shiftT(81);                   // 'at'
      lookahead1W(125);             // S^WS | '(:' | 'least' | 'most'
      switch (l1)
      {
      case 173:                     // 'least'
        shiftT(173);                // 'least'
        lookahead1W(16);            // IntegerLiteral | S^WS | '(:'
        shiftT(8);                  // IntegerLiteral
        break;
      default:
        shiftT(183);                // 'most'
        lookahead1W(16);            // IntegerLiteral | S^WS | '(:'
        shiftT(8);                  // IntegerLiteral
      }
      break;
    default:
      shiftT(140);                  // 'from'
      lookahead1W(16);              // IntegerLiteral | S^WS | '(:'
      shiftT(8);                    // IntegerLiteral
      lookahead1W(79);              // S^WS | '(:' | 'to'
      shiftT(248);                  // 'to'
      lookahead1W(16);              // IntegerLiteral | S^WS | '(:'
      shiftT(8);                    // IntegerLiteral
    }
  }