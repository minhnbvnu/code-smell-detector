function try_NotExpr()
  {
    if (l1 == 196)                  // 'not'
    {
      shiftT(196);                  // 'not'
    }
    lookahead1W(265);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    try_ComparisonExpr();
  }