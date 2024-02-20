function try_LetClause()
  {
    shiftT(174);                    // 'let'
    lookahead1W(96);                // S^WS | '$' | '(:' | 'score'
    try_LetBinding();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shiftT(41);                   // ','
      lookahead1W(96);              // S^WS | '$' | '(:' | 'score'
      try_LetBinding();
    }
  }