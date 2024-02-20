function parse_FTStopWords()
  {
    eventHandler.startNonterminal("FTStopWords", e0);
    switch (l1)
    {
    case 81:                        // 'at'
      shift(81);                    // 'at'
      lookahead1W(15);              // URILiteral | S^WS | '(:'
      shift(7);                     // URILiteral
      break;
    default:
      shift(34);                    // '('
      lookahead1W(17);              // StringLiteral | S^WS | '(:'
      shift(11);                    // StringLiteral
      for (;;)
      {
        lookahead1W(101);           // S^WS | '(:' | ')' | ','
        if (l1 != 41)               // ','
        {
          break;
        }
        shift(41);                  // ','
        lookahead1W(17);            // StringLiteral | S^WS | '(:'
        shift(11);                  // StringLiteral
      }
      shift(37);                    // ')'
    }
    eventHandler.endNonterminal("FTStopWords", e0);
  }