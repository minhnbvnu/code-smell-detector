function try_FTStopWords()
  {
    switch (l1)
    {
    case 81:                        // 'at'
      shiftT(81);                   // 'at'
      lookahead1W(15);              // URILiteral | S^WS | '(:'
      shiftT(7);                    // URILiteral
      break;
    default:
      shiftT(34);                   // '('
      lookahead1W(17);              // StringLiteral | S^WS | '(:'
      shiftT(11);                   // StringLiteral
      for (;;)
      {
        lookahead1W(101);           // S^WS | '(:' | ')' | ','
        if (l1 != 41)               // ','
        {
          break;
        }
        shiftT(41);                 // ','
        lookahead1W(17);            // StringLiteral | S^WS | '(:'
        shiftT(11);                 // StringLiteral
      }
      shiftT(37);                   // ')'
    }
  }