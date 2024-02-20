function parse_FTUnaryNot()
  {
    eventHandler.startNonterminal("FTUnaryNot", e0);
    if (l1 == 143)                  // 'ftnot'
    {
      shift(143);                   // 'ftnot'
    }
    lookahead1W(155);               // StringLiteral | S^WS | '(' | '(#' | '(:' | '{'
    whitespace();
    parse_FTPrimaryWithOptions();
    eventHandler.endNonterminal("FTUnaryNot", e0);
  }