function try_Predicate()
  {
    shiftT(68);                     // '['
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Expr();
    shiftT(69);                     // ']'
  }