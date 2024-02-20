function try_JSONAppendExpr()
  {
    shiftT(77);                     // 'append'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shiftT(166);                    // 'json'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
    shiftT(163);                    // 'into'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }