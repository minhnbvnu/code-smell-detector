function try_PairConstructor()
  {
    try_ExprSingle();
    shiftT(49);                     // ':'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }