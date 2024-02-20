function parse_FTScoreVar()
  {
    eventHandler.startNonterminal("FTScoreVar", e0);
    shift(228);                     // 'score'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    eventHandler.endNonterminal("FTScoreVar", e0);
  }