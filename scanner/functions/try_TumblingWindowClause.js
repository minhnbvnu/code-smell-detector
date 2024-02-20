function try_TumblingWindowClause()
  {
    shiftT(251);                    // 'tumbling'
    lookahead1W(85);                // S^WS | '(:' | 'window'
    shiftT(269);                    // 'window'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shiftT(31);                     // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_VarName();
    lookahead1W(110);               // S^WS | '(:' | 'as' | 'in'
    if (l1 == 79)                   // 'as'
    {
      try_TypeDeclaration();
    }
    lookahead1W(53);                // S^WS | '(:' | 'in'
    shiftT(154);                    // 'in'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
    try_WindowStartCondition();
    if (l1 == 126                   // 'end'
     || l1 == 198)                  // 'only'
    {
      try_WindowEndCondition();
    }
  }