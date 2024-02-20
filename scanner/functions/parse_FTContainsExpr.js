function parse_FTContainsExpr()
  {
    eventHandler.startNonterminal("FTContainsExpr", e0);
    parse_StringConcatExpr();
    if (l1 == 99)                   // 'contains'
    {
      shift(99);                    // 'contains'
      lookahead1W(76);              // S^WS | '(:' | 'text'
      shift(244);                   // 'text'
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      whitespace();
      parse_FTSelection();
      if (l1 == 271)                // 'without'
      {
        whitespace();
        parse_FTIgnoreOption();
      }
    }
    eventHandler.endNonterminal("FTContainsExpr", e0);
  }