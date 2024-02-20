function try_FTWindow()
  {
    shiftT(269);                    // 'window'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_AdditiveExpr();
    try_FTUnit();
  }