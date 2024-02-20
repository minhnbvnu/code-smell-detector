function try_AdditiveExpr()
  {
    try_MultiplicativeExpr();
    for (;;)
    {
      if (l1 != 40                  // '+'
       && l1 != 42)                 // '-'
      {
        break;
      }
      switch (l1)
      {
      case 40:                      // '+'
        shiftT(40);                 // '+'
        break;
      default:
        shiftT(42);                 // '-'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_MultiplicativeExpr();
    }
  }