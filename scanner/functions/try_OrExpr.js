function try_OrExpr()
  {
    try_AndExpr();
    for (;;)
    {
      if (l1 != 200)                // 'or'
      {
        break;
      }
      shiftT(200);                  // 'or'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_AndExpr();
    }
  }