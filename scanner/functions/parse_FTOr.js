function parse_FTOr()
  {
    eventHandler.startNonterminal("FTOr", e0);
    parse_FTAnd();
    for (;;)
    {
      if (l1 != 144)                // 'ftor'
      {
        break;
      }
      shift(144);                   // 'ftor'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      whitespace();
      parse_FTAnd();
    }
    eventHandler.endNonterminal("FTOr", e0);
  }