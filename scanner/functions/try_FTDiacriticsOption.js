function try_FTDiacriticsOption()
  {
    shiftT(114);                    // 'diacritics'
    lookahead1W(124);               // S^WS | '(:' | 'insensitive' | 'sensitive'
    switch (l1)
    {
    case 158:                       // 'insensitive'
      shiftT(158);                  // 'insensitive'
      break;
    default:
      shiftT(230);                  // 'sensitive'
    }
  }