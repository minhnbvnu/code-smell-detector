function try_GroupingSpecList()
  {
    try_GroupingSpec();
    for (;;)
    {
      lookahead1W(176);             // S^WS | '(:' | ',' | 'count' | 'for' | 'group' | 'let' | 'order' | 'return' |
      if (l1 != 41)                 // ','
      {
        break;
      }
      shiftT(41);                   // ','
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_GroupingSpec();
    }
  }