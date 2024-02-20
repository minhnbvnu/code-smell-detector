function try_WindowEndCondition()
  {
    if (l1 == 198)                  // 'only'
    {
      shiftT(198);                  // 'only'
    }
    lookahead1W(50);                // S^WS | '(:' | 'end'
    shiftT(126);                    // 'end'
    lookahead1W(163);               // S^WS | '$' | '(:' | 'at' | 'next' | 'previous' | 'when'
    try_WindowVars();
    lookahead1W(83);                // S^WS | '(:' | 'when'
    shiftT(265);                    // 'when'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }