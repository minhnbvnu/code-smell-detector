function parse_CompDocConstructor()
  {
    eventHandler.startNonterminal("CompDocConstructor", e0);
    shift(119);                     // 'document'
    lookahead1W(87);                // S^WS | '(:' | '{'
    whitespace();
    parse_BlockExpr();
    eventHandler.endNonterminal("CompDocConstructor", e0);
  }