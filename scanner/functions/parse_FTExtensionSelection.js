function parse_FTExtensionSelection()
  {
    eventHandler.startNonterminal("FTExtensionSelection", e0);
    for (;;)
    {
      whitespace();
      parse_Pragma();
      lookahead1W(100);             // S^WS | '(#' | '(:' | '{'
      if (l1 != 35)                 // '(#'
      {
        break;
      }
    }
    shift(276);                     // '{'
    lookahead1W(166);               // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{' | '}'
    if (l1 != 282)                  // '}'
    {
      whitespace();
      parse_FTSelection();
    }
    shift(282);                     // '}'
    eventHandler.endNonterminal("FTExtensionSelection", e0);
  }