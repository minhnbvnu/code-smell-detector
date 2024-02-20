function try_StringConcatExpr()
  {
    try_RangeExpr();
    for (;;)
    {
      if (l1 != 280)                // '||'
      {
        break;
      }
      shiftT(280);                  // '||'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_RangeExpr();
    }
  }