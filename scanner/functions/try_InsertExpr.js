function try_InsertExpr()
  {
    shiftT(159);                    // 'insert'
    lookahead1W(129);               // S^WS | '(:' | 'node' | 'nodes'
    switch (l1)
    {
    case 191:                       // 'node'
      shiftT(191);                  // 'node'
      break;
    default:
      shiftT(192);                  // 'nodes'
    }
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_SourceExpr();
    try_InsertExprTargetChoice();
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_TargetExpr();
  }