function parse_FTDistance()
  {
    eventHandler.startNonterminal("FTDistance", e0);
    shift(117);                     // 'distance'
    lookahead1W(149);               // S^WS | '(:' | 'at' | 'exactly' | 'from'
    whitespace();
    parse_FTRange();
    whitespace();
    parse_FTUnit();
    eventHandler.endNonterminal("FTDistance", e0);
  }