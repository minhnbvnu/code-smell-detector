function try_UnaryExpr()
  {
    for (;;)
    {
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      if (l1 != 40                  // '+'
       && l1 != 42)                 // '-'
      {
        break;
      }
      switch (l1)
      {
      case 42:                      // '-'
        shiftT(42);                 // '-'
        break;
      default:
        shiftT(40);                 // '+'
      }
    }
    try_ValueExpr();
  }