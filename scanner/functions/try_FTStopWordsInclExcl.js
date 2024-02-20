function try_FTStopWordsInclExcl()
  {
    switch (l1)
    {
    case 254:                       // 'union'
      shiftT(254);                  // 'union'
      break;
    default:
      shiftT(131);                  // 'except'
    }
    lookahead1W(99);                // S^WS | '(' | '(:' | 'at'
    try_FTStopWords();
  }