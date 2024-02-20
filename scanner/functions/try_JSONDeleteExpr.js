function try_JSONDeleteExpr()
  {
    shiftT(110);                    // 'delete'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shiftT(166);                    // 'json'
    lookahead1W(263);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    try_PostfixExpr();
  }