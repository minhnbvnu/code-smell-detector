function try_BlockStatement()
  {
    shiftT(276);                    // '{'
    lookahead1W(276);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Statements();
    shiftT(282);                    // '}'
  }