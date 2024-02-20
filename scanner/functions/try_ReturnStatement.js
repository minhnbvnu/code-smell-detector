function try_ReturnStatement()
  {
    shiftT(220);                    // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Statement();
  }