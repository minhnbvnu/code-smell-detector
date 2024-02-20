function try_FTWildCardOption()
  {
    switch (l1)
    {
    case 268:                       // 'wildcards'
      shiftT(268);                  // 'wildcards'
      break;
    default:
      shiftT(188);                  // 'no'
      lookahead1W(84);              // S^WS | '(:' | 'wildcards'
      shiftT(268);                  // 'wildcards'
    }
  }