function try_ElementTest()
  {
    shiftT(121);                    // 'element'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(260);               // EQName^Token | S^WS | '(:' | ')' | '*' | 'after' | 'allowing' | 'ancestor' |
    if (l1 != 37)                   // ')'
    {
      try_ElementNameOrWildcard();
      lookahead1W(101);             // S^WS | '(:' | ')' | ','
      if (l1 == 41)                 // ','
      {
        shiftT(41);                 // ','
        lookahead1W(254);           // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
        try_TypeName();
        lookahead1W(102);           // S^WS | '(:' | ')' | '?'
        if (l1 == 64)               // '?'
        {
          shiftT(64);               // '?'
        }
      }
    }
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }