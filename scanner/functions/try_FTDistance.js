function try_FTDistance()
  {
    shiftT(117);                    // 'distance'
    lookahead1W(149);               // S^WS | '(:' | 'at' | 'exactly' | 'from'
    try_FTRange();
    try_FTUnit();
  }