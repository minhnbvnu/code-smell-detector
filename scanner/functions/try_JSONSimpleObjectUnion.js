function try_JSONSimpleObjectUnion()
  {
    shiftT(278);                    // '{|'
    lookahead1W(272);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 281)                  // '|}'
    {
      try_Expr();
    }
    shiftT(281);                    // '|}'
  }