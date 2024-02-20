function try_ForBinding()
  {
    shiftT(31);                     // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_VarName();
    lookahead1W(164);               // S^WS | '(:' | 'allowing' | 'as' | 'at' | 'in' | 'score'
    if (l1 == 79)                   // 'as'
    {
      try_TypeDeclaration();
    }
    lookahead1W(158);               // S^WS | '(:' | 'allowing' | 'at' | 'in' | 'score'
    if (l1 == 72)                   // 'allowing'
    {
      try_AllowingEmpty();
    }
    lookahead1W(150);               // S^WS | '(:' | 'at' | 'in' | 'score'
    if (l1 == 81)                   // 'at'
    {
      try_PositionalVar();
    }
    lookahead1W(122);               // S^WS | '(:' | 'in' | 'score'
    if (l1 == 228)                  // 'score'
    {
      try_FTScoreVar();
    }
    lookahead1W(53);                // S^WS | '(:' | 'in'
    shiftT(154);                    // 'in'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }