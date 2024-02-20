function try_SimpleMapExpr()
  {
    try_PathExpr();
    for (;;)
    {
      if (l1 != 26)                 // '!'
      {
        break;
      }
      shiftT(26);                   // '!'
      lookahead1W(265);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_PathExpr();
    }
  }