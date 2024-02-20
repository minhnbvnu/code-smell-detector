function try_ArrayLookup()
  {
    shiftT(69);                     // '['
    lookahead1W(31);                // S^WS | '(:' | '['
    shiftT(69);                     // '['
    lookahead1W(266);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    try_Expr();
    shiftT(70);                     // ']'
    lookahead1W(32);                // S^WS | '(:' | ']'
    shiftT(70);                     // ']'
  }