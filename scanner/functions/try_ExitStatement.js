function try_ExitStatement()
  {
    shiftT(132);                    // 'exit'
    lookahead1W(71);                // S^WS | '(:' | 'returning'
    shiftT(221);                    // 'returning'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
    shiftT(53);                     // ';'
  }