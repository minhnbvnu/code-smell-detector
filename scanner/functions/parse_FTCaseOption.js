function parse_FTCaseOption()
  {
    eventHandler.startNonterminal("FTCaseOption", e0);
    switch (l1)
    {
    case 88:                        // 'case'
      shift(88);                    // 'case'
      lookahead1W(124);             // S^WS | '(:' | 'insensitive' | 'sensitive'
      switch (l1)
      {
      case 158:                     // 'insensitive'
        shift(158);                 // 'insensitive'
        break;
      default:
        shift(230);                 // 'sensitive'
      }
      break;
    case 177:                       // 'lowercase'
      shift(177);                   // 'lowercase'
      break;
    default:
      shift(258);                   // 'uppercase'
    }
    eventHandler.endNonterminal("FTCaseOption", e0);
  }