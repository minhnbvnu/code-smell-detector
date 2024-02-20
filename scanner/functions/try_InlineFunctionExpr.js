function try_InlineFunctionExpr()
  {
    for (;;)
    {
      lookahead1W(97);              // S^WS | '%' | '(:' | 'function'
      if (l1 != 32)                 // '%'
      {
        break;
      }
      try_Annotation();
    }
    shiftT(145);                    // 'function'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(94);                // S^WS | '$' | '(:' | ')'
    if (l1 == 31)                   // '$'
    {
      try_ParamList();
    }
    shiftT(37);                     // ')'
    lookahead1W(111);               // S^WS | '(:' | 'as' | '{'
    if (l1 == 79)                   // 'as'
    {
      shiftT(79);                   // 'as'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_SequenceType();
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    try_FunctionBody();
  }