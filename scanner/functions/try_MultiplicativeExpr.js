function try_MultiplicativeExpr()
  {
    try_UnionExpr();
    for (;;)
    {
      if (l1 != 38                  // '*'
       && l1 != 118                 // 'div'
       && l1 != 151                 // 'idiv'
       && l1 != 180)                // 'mod'
      {
        break;
      }
      switch (l1)
      {
      case 38:                      // '*'
        shiftT(38);                 // '*'
        break;
      case 118:                     // 'div'
        shiftT(118);                // 'div'
        break;
      case 151:                     // 'idiv'
        shiftT(151);                // 'idiv'
        break;
      default:
        shiftT(180);                // 'mod'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_UnionExpr();
    }
  }