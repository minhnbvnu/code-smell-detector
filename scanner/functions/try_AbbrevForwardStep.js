function try_AbbrevForwardStep()
  {
    if (l1 == 66)                   // '@'
    {
      shiftT(66);                   // '@'
    }
    lookahead1W(256);               // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_NodeTest();
  }