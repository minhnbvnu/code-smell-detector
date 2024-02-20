function parse_FTStemOption()
  {
    eventHandler.startNonterminal("FTStemOption", e0);
    switch (l1)
    {
    case 238:                       // 'stemming'
      shift(238);                   // 'stemming'
      break;
    default:
      shift(188);                   // 'no'
      lookahead1W(74);              // S^WS | '(:' | 'stemming'
      shift(238);                   // 'stemming'
    }
    eventHandler.endNonterminal("FTStemOption", e0);
  }