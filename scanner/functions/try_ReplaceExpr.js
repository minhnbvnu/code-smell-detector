function try_ReplaceExpr()
  {
    shiftT(219);                    // 'replace'
    lookahead1W(130);               // S^WS | '(:' | 'node' | 'value'
    if (l1 == 261)                  // 'value'
    {
      shiftT(261);                  // 'value'
      lookahead1W(64);              // S^WS | '(:' | 'of'
      shiftT(196);                  // 'of'
    }
    lookahead1W(62);                // S^WS | '(:' | 'node'
    shiftT(191);                    // 'node'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_TargetExpr();
    shiftT(270);                    // 'with'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }