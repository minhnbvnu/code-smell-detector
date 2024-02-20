function try_FTExtensionSelection()
  {
    for (;;)
    {
      try_Pragma();
      lookahead1W(100);             // S^WS | '(#' | '(:' | '{'
      if (l1 != 35)                 // '(#'
      {
        break;
      }
    }
    shiftT(276);                    // '{'
    lookahead1W(166);               // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{' | '}'
    if (l1 != 282)                  // '}'
    {
      try_FTSelection();
    }
    shiftT(282);                    // '}'
  }