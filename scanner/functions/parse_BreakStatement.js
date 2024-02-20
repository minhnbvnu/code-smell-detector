function parse_BreakStatement()
  {
    eventHandler.startNonterminal("BreakStatement", e0);
    shift(86);                      // 'break'
    lookahead1W(59);                // S^WS | '(:' | 'loop'
    shift(176);                     // 'loop'
    lookahead1W(28);                // S^WS | '(:' | ';'
    shift(53);                      // ';'
    eventHandler.endNonterminal("BreakStatement", e0);
  }