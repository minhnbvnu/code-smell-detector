function try_WindowVars()
  {
    if (l1 == 31)                   // '$'
    {
      shiftT(31);                   // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_CurrentItem();
    }
    lookahead1W(159);               // S^WS | '(:' | 'at' | 'next' | 'previous' | 'when'
    if (l1 == 81)                   // 'at'
    {
      try_PositionalVar();
    }
    lookahead1W(153);               // S^WS | '(:' | 'next' | 'previous' | 'when'
    if (l1 == 215)                  // 'previous'
    {
      shiftT(215);                  // 'previous'
      lookahead1W(21);              // S^WS | '$' | '(:'
      shiftT(31);                   // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_PreviousItem();
    }
    lookahead1W(127);               // S^WS | '(:' | 'next' | 'when'
    if (l1 == 187)                  // 'next'
    {
      shiftT(187);                  // 'next'
      lookahead1W(21);              // S^WS | '$' | '(:'
      shiftT(31);                   // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_NextItem();
    }
  }