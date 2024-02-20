function parse_AllowingEmpty()
  {
    eventHandler.startNonterminal("AllowingEmpty", e0);
    shift(72);                      // 'allowing'
    lookahead1W(49);                // S^WS | '(:' | 'empty'
    shift(123);                     // 'empty'
    eventHandler.endNonterminal("AllowingEmpty", e0);
  }