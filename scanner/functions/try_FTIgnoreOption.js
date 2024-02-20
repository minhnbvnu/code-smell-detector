function try_FTIgnoreOption()
  {
    shiftT(271);                    // 'without'
    lookahead1W(42);                // S^WS | '(:' | 'content'
    shiftT(100);                    // 'content'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_UnionExpr();
  }