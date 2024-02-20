function parse_FTOptionDecl()
  {
    eventHandler.startNonterminal("FTOptionDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(52);                // S^WS | '(:' | 'ft-option'
    shift(141);                     // 'ft-option'
    lookahead1W(81);                // S^WS | '(:' | 'using'
    whitespace();
    parse_FTMatchOptions();
    eventHandler.endNonterminal("FTOptionDecl", e0);
  }