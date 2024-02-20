function try_LetBinding()
  {
    switch (l1)
    {
    case 31:                        // '$'
      shiftT(31);                   // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_VarName();
      lookahead1W(105);             // S^WS | '(:' | ':=' | 'as'
      if (l1 == 79)                 // 'as'
      {
        try_TypeDeclaration();
      }
      break;
    default:
      try_FTScoreVar();
    }
    lookahead1W(27);                // S^WS | '(:' | ':='
    shiftT(52);                     // ':='
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }