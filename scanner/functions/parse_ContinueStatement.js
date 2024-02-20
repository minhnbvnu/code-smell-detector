function parse_ContinueStatement()
  {
    eventHandler.startNonterminal("ContinueStatement", e0);
    shift(102);                     // 'continue'
    lookahead1W(59);                // S^WS | '(:' | 'loop'
    shift(176);                     // 'loop'
    lookahead1W(28);                // S^WS | '(:' | ';'
    shift(53);                      // ';'
    eventHandler.endNonterminal("ContinueStatement", e0);
  }