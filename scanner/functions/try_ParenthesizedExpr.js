function try_ParenthesizedExpr()
  {
    shiftT(34);                     // '('
    lookahead1W(268);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 37)                   // ')'
    {
      try_Expr();
    }
    shiftT(37);                     // ')'
  }