function try_SequenceTypeUnion()
  {
    try_SequenceType();
    for (;;)
    {
      lookahead1W(134);             // S^WS | '(:' | 'return' | '|'
      if (l1 != 279)                // '|'
      {
        break;
      }
      shiftT(279);                  // '|'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_SequenceType();
    }
  }