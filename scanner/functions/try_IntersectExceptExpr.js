function try_IntersectExceptExpr()
  {
    try_InstanceofExpr();
    for (;;)
    {
      lookahead1W(222);             // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
      if (l1 != 131                 // 'except'
       && l1 != 162)                // 'intersect'
      {
        break;
      }
      switch (l1)
      {
      case 162:                     // 'intersect'
        shiftT(162);                // 'intersect'
        break;
      default:
        shiftT(131);                // 'except'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_InstanceofExpr();
    }
  }