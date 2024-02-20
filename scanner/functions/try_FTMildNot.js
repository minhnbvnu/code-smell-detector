function try_FTMildNot()
  {
    try_FTUnaryNot();
    for (;;)
    {
      lookahead1W(212);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 != 193)                // 'not'
      {
        break;
      }
      shiftT(193);                  // 'not'
      lookahead1W(53);              // S^WS | '(:' | 'in'
      shiftT(154);                  // 'in'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      try_FTUnaryNot();
    }
  }