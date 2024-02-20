function try_FTAnd()
  {
    try_FTMildNot();
    for (;;)
    {
      if (l1 != 142)                // 'ftand'
      {
        break;
      }
      shiftT(142);                  // 'ftand'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      try_FTMildNot();
    }
  }