function try_QuantifiedExpr()
  {
    switch (l1)
    {
    case 235:                       // 'some'
      shiftT(235);                  // 'some'
      break;
    default:
      shiftT(129);                  // 'every'
    }
    lookahead1W(21);                // S^WS | '$' | '(:'
    try_QuantifiedVarDecl();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shiftT(41);                   // ','
      lookahead1W(21);              // S^WS | '$' | '(:'
      try_QuantifiedVarDecl();
    }
    shiftT(224);                    // 'satisfies'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }