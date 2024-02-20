function parse_FTAnd()
  {
    eventHandler.startNonterminal("FTAnd", e0);
    parse_FTMildNot();
    for (;;)
    {
      if (l1 != 142)                // 'ftand'
      {
        break;
      }
      shift(142);                   // 'ftand'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      whitespace();
      parse_FTMildNot();
    }
    eventHandler.endNonterminal("FTAnd", e0);
  }