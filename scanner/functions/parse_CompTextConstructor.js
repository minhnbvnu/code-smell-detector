function parse_CompTextConstructor()
  {
    eventHandler.startNonterminal("CompTextConstructor", e0);
    shift(244);                     // 'text'
    lookahead1W(87);                // S^WS | '(:' | '{'
    whitespace();
    parse_BlockExpr();
    eventHandler.endNonterminal("CompTextConstructor", e0);
  }