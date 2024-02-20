function try_ForClause()
  {
    shiftT(137);                    // 'for'
    lookahead1W(21);                // S^WS | '$' | '(:'
    try_ForBinding();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shiftT(41);                   // ','
      lookahead1W(21);              // S^WS | '$' | '(:'
      try_ForBinding();
    }
  }