function try_FTTimes()
  {
    shiftT(195);                    // 'occurs'
    lookahead1W(149);               // S^WS | '(:' | 'at' | 'exactly' | 'from'
    try_FTRange();
    shiftT(247);                    // 'times'
  }