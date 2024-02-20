function try_FTContainsExpr()
  {
    try_StringConcatExpr();
    if (l1 == 99)                   // 'contains'
    {
      shiftT(99);                   // 'contains'
      lookahead1W(76);              // S^WS | '(:' | 'text'
      shiftT(244);                  // 'text'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      try_FTSelection();
      if (l1 == 271)                // 'without'
      {
        try_FTIgnoreOption();
      }
    }
  }