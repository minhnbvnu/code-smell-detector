function try_Param()
  {
    shiftT(31);                     // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_EQName();
    lookahead1W(143);               // S^WS | '(:' | ')' | ',' | 'as'
    if (l1 == 79)                   // 'as'
    {
      try_TypeDeclaration();
    }
  }