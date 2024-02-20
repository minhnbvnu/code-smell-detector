function try_BlockExpr()
  {
    shiftT(276);                    // '{'
    lookahead1W(276);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_StatementsAndOptionalExpr();
    shiftT(282);                    // '}'
  }