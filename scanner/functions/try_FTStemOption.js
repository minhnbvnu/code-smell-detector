function try_FTStemOption()
  {
    switch (l1)
    {
    case 238:                       // 'stemming'
      shiftT(238);                  // 'stemming'
      break;
    default:
      shiftT(188);                  // 'no'
      lookahead1W(74);              // S^WS | '(:' | 'stemming'
      shiftT(238);                  // 'stemming'
    }
  }