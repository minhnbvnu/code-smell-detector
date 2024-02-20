function try_FTOr()
  {
    try_FTAnd();
    for (;;)
    {
      if (l1 != 144)                // 'ftor'
      {
        break;
      }
      shiftT(144);                  // 'ftor'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      try_FTAnd();
    }
  }