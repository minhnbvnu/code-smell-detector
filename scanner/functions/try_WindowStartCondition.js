function try_WindowStartCondition()
  {
    shiftT(237);                    // 'start'
    lookahead1W(163);               // S^WS | '$' | '(:' | 'at' | 'next' | 'previous' | 'when'
    try_WindowVars();
    lookahead1W(83);                // S^WS | '(:' | 'when'
    shiftT(265);                    // 'when'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }