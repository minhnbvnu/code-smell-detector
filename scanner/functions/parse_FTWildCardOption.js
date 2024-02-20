function parse_FTWildCardOption()
  {
    eventHandler.startNonterminal("FTWildCardOption", e0);
    switch (l1)
    {
    case 268:                       // 'wildcards'
      shift(268);                   // 'wildcards'
      break;
    default:
      shift(188);                   // 'no'
      lookahead1W(84);              // S^WS | '(:' | 'wildcards'
      shift(268);                   // 'wildcards'
    }
    eventHandler.endNonterminal("FTWildCardOption", e0);
  }