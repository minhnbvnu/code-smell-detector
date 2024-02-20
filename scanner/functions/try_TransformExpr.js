function try_TransformExpr()
  {
    shiftT(103);                    // 'copy'
    lookahead1W(21);                // S^WS | '$' | '(:'
    try_TransformSpec();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shiftT(41);                   // ','
      lookahead1W(21);              // S^WS | '$' | '(:'
      try_TransformSpec();
    }
    shiftT(181);                    // 'modify'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
    shiftT(220);                    // 'return'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }