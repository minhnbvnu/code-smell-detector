function try_JSONRenameExpr()
  {
    shiftT(218);                    // 'rename'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shiftT(166);                    // 'json'
    lookahead1W(263);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    try_PostfixExpr();
    shiftT(79);                     // 'as'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }