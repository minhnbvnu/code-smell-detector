function parse_WindowClause()
  {
    eventHandler.startNonterminal("WindowClause", e0);
    shift(137);                     // 'for'
    lookahead1W(135);               // S^WS | '(:' | 'sliding' | 'tumbling'
    switch (l1)
    {
    case 251:                       // 'tumbling'
      whitespace();
      parse_TumblingWindowClause();
      break;
    default:
      whitespace();
      parse_SlidingWindowClause();
    }
    eventHandler.endNonterminal("WindowClause", e0);
  }