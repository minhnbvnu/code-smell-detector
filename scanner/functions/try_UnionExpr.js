function try_UnionExpr()
  {
    try_IntersectExceptExpr();
    for (;;)
    {
      if (l1 != 254                 // 'union'
       && l1 != 279)                // '|'
      {
        break;
      }
      switch (l1)
      {
      case 254:                     // 'union'
        shiftT(254);                // 'union'
        break;
      default:
        shiftT(279);                // '|'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_IntersectExceptExpr();
    }
  }