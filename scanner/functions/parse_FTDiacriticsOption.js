function parse_FTDiacriticsOption()
  {
    eventHandler.startNonterminal("FTDiacriticsOption", e0);
    shift(114);                     // 'diacritics'
    lookahead1W(124);               // S^WS | '(:' | 'insensitive' | 'sensitive'
    switch (l1)
    {
    case 158:                       // 'insensitive'
      shift(158);                   // 'insensitive'
      break;
    default:
      shift(230);                   // 'sensitive'
    }
    eventHandler.endNonterminal("FTDiacriticsOption", e0);
  }