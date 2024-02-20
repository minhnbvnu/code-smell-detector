function try_FTPrimary()
  {
    switch (l1)
    {
    case 34:                        // '('
      shiftT(34);                   // '('
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      try_FTSelection();
      shiftT(37);                   // ')'
      break;
    case 35:                        // '(#'
      try_FTExtensionSelection();
      break;
    default:
      try_FTWords();
      lookahead1W(215);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 == 195)                // 'occurs'
      {
        try_FTTimes();
      }
    }
  }