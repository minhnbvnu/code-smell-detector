function try_WindowClause()
  {
    shiftT(137);                    // 'for'
    lookahead1W(135);               // S^WS | '(:' | 'sliding' | 'tumbling'
    switch (l1)
    {
    case 251:                       // 'tumbling'
      try_TumblingWindowClause();
      break;
    default:
      try_SlidingWindowClause();
    }
  }