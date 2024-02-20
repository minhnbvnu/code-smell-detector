function parse_FTMildNot()
  {
    eventHandler.startNonterminal("FTMildNot", e0);
    parse_FTUnaryNot();
    for (;;)
    {
      lookahead1W(212);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 != 193)                // 'not'
      {
        break;
      }
      shift(193);                   // 'not'
      lookahead1W(53);              // S^WS | '(:' | 'in'
      shift(154);                   // 'in'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      whitespace();
      parse_FTUnaryNot();
    }
    eventHandler.endNonterminal("FTMildNot", e0);
  }