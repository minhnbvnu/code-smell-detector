function parse_PositionalVar()
  {
    eventHandler.startNonterminal("PositionalVar", e0);
    shift(81);                      // 'at'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    eventHandler.endNonterminal("PositionalVar", e0);
  }