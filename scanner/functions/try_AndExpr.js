function try_AndExpr()
  {
    try_ComparisonExpr();
    for (;;)
    {
      if (l1 != 75)                 // 'and'
      {
        break;
      }
      shiftT(75);                   // 'and'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_ComparisonExpr();
    }
  }