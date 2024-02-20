function try_FTThesaurusID()
  {
    shiftT(81);                     // 'at'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shiftT(7);                      // URILiteral
    lookahead1W(220);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    if (l1 == 217)                  // 'relationship'
    {
      shiftT(217);                  // 'relationship'
      lookahead1W(17);              // StringLiteral | S^WS | '(:'
      shiftT(11);                   // StringLiteral
    }
    lookahead1W(216);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    switch (l1)
    {
    case 81:                        // 'at'
      lookahead2W(165);             // S^WS | '(:' | 'end' | 'least' | 'most' | 'position' | 'start'
      break;
    default:
      lk = l1;
    }
    if (lk == 130                   // 'exactly'
     || lk == 140                   // 'from'
     || lk == 88657                 // 'at' 'least'
     || lk == 93777)                // 'at' 'most'
    {
      try_FTLiteralRange();
      lookahead1W(58);              // S^WS | '(:' | 'levels'
      shiftT(175);                  // 'levels'
    }
  }