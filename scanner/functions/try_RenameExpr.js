function try_RenameExpr()
  {
    shiftT(218);                    // 'rename'
    lookahead1W(62);                // S^WS | '(:' | 'node'
    shiftT(191);                    // 'node'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_TargetExpr();
    shiftT(79);                     // 'as'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_NewNameExpr();
  }