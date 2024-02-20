function parse_FTTimes()
  {
    eventHandler.startNonterminal("FTTimes", e0);
    shift(195);                     // 'occurs'
    lookahead1W(149);               // S^WS | '(:' | 'at' | 'exactly' | 'from'
    whitespace();
    parse_FTRange();
    shift(247);                     // 'times'
    eventHandler.endNonterminal("FTTimes", e0);
  }