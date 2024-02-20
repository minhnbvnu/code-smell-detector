function try_JSONReplaceExpr()
  {
    shiftT(219);                    // 'replace'
    lookahead1W(82);                // S^WS | '(:' | 'value'
    shiftT(261);                    // 'value'
    lookahead1W(64);                // S^WS | '(:' | 'of'
    shiftT(196);                    // 'of'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shiftT(166);                    // 'json'
    lookahead1W(263);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    try_PostfixExpr();
    shiftT(270);                    // 'with'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }