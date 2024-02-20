function try_VarDeclStatement()
  {
    for (;;)
    {
      lookahead1W(98);              // S^WS | '%' | '(:' | 'variable'
      if (l1 != 32)                 // '%'
      {
        break;
      }
      try_Annotation();
    }
    shiftT(262);                    // 'variable'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shiftT(31);                     // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_VarName();
    lookahead1W(157);               // S^WS | '(:' | ',' | ':=' | ';' | 'as'
    if (l1 == 79)                   // 'as'
    {
      try_TypeDeclaration();
    }
    lookahead1W(145);               // S^WS | '(:' | ',' | ':=' | ';'
    if (l1 == 52)                   // ':='
    {
      shiftT(52);                   // ':='
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_ExprSingle();
    }
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shiftT(41);                   // ','
      lookahead1W(21);              // S^WS | '$' | '(:'
      shiftT(31);                   // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_VarName();
      lookahead1W(157);             // S^WS | '(:' | ',' | ':=' | ';' | 'as'
      if (l1 == 79)                 // 'as'
      {
        try_TypeDeclaration();
      }
      lookahead1W(145);             // S^WS | '(:' | ',' | ':=' | ';'
      if (l1 == 52)                 // ':='
      {
        shiftT(52);                 // ':='
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_ExprSingle();
      }
    }
    shiftT(53);                     // ';'
  }