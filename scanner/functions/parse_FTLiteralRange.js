function parse_FTLiteralRange()
  {
    eventHandler.startNonterminal("FTLiteralRange", e0);
    switch (l1)
    {
    case 130:                       // 'exactly'
      shift(130);                   // 'exactly'
      lookahead1W(16);              // IntegerLiteral | S^WS | '(:'
      shift(8);                     // IntegerLiteral
      break;
    case 81:                        // 'at'
      shift(81);                    // 'at'
      lookahead1W(125);             // S^WS | '(:' | 'least' | 'most'
      switch (l1)
      {
      case 173:                     // 'least'
        shift(173);                 // 'least'
        lookahead1W(16);            // IntegerLiteral | S^WS | '(:'
        shift(8);                   // IntegerLiteral
        break;
      default:
        shift(183);                 // 'most'
        lookahead1W(16);            // IntegerLiteral | S^WS | '(:'
        shift(8);                   // IntegerLiteral
      }
      break;
    default:
      shift(140);                   // 'from'
      lookahead1W(16);              // IntegerLiteral | S^WS | '(:'
      shift(8);                     // IntegerLiteral
      lookahead1W(79);              // S^WS | '(:' | 'to'
      shift(248);                   // 'to'
      lookahead1W(16);              // IntegerLiteral | S^WS | '(:'
      shift(8);                     // IntegerLiteral
    }
    eventHandler.endNonterminal("FTLiteralRange", e0);
  }