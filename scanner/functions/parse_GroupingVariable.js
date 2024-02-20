function parse_GroupingVariable()
  {
    eventHandler.startNonterminal("GroupingVariable", e0);
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    eventHandler.endNonterminal("GroupingVariable", e0);
  }