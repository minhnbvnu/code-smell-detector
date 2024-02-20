function try_FTCaseOption()
  {
    switch (l1)
    {
    case 88:                        // 'case'
      shiftT(88);                   // 'case'
      lookahead1W(124);             // S^WS | '(:' | 'insensitive' | 'sensitive'
      switch (l1)
      {
      case 158:                     // 'insensitive'
        shiftT(158);                // 'insensitive'
        break;
      default:
        shiftT(230);                // 'sensitive'
      }
      break;
    case 177:                       // 'lowercase'
      shiftT(177);                  // 'lowercase'
      break;
    default:
      shiftT(258);                  // 'uppercase'
    }
  }