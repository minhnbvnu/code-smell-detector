function try_TryCatchExpr()
  {
    try_TryClause();
    for (;;)
    {
      lookahead1W(36);              // S^WS | '(:' | 'catch'
      try_CatchClause();
      lookahead1W(183);             // S^WS | EOF | '(:' | ')' | ',' | ':' | ';' | ']' | 'after' | 'as' | 'ascending' |
      if (l1 != 91)                 // 'catch'
      {
        break;
      }
    }
  }