function try_ArrayConstructor()
  {
    shiftT(68);                     // '['
    lookahead1W(271);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 69)                   // ']'
    {
      try_Expr();
    }
    shiftT(69);                     // ']'
  }