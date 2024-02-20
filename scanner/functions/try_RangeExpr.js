function try_RangeExpr()
  {
    try_AdditiveExpr();
    if (l1 == 248)                  // 'to'
    {
      shiftT(248);                  // 'to'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_AdditiveExpr();
    }
  }