function try_TypedFunctionTest()
  {
    shiftT(145);                    // 'function'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(262);               // EQName^Token | S^WS | '%' | '(' | '(:' | ')' | 'after' | 'allowing' |
    if (l1 != 37)                   // ')'
    {
      try_SequenceType();
      for (;;)
      {
        lookahead1W(101);           // S^WS | '(:' | ')' | ','
        if (l1 != 41)               // ','
        {
          break;
        }
        shiftT(41);                 // ','
        lookahead1W(259);           // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
        try_SequenceType();
      }
    }
    shiftT(37);                     // ')'
    lookahead1W(30);                // S^WS | '(:' | 'as'
    shiftT(79);                     // 'as'
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_SequenceType();
  }