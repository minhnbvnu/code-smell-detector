function parse_FTStopWordsInclExcl()
  {
    eventHandler.startNonterminal("FTStopWordsInclExcl", e0);
    switch (l1)
    {
    case 254:                       // 'union'
      shift(254);                   // 'union'
      break;
    default:
      shift(131);                   // 'except'
    }
    lookahead1W(99);                // S^WS | '(' | '(:' | 'at'
    whitespace();
    parse_FTStopWords();
    eventHandler.endNonterminal("FTStopWordsInclExcl", e0);
  }