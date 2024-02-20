function try_FTScope()
  {
    switch (l1)
    {
    case 223:                       // 'same'
      shiftT(223);                  // 'same'
      break;
    default:
      shiftT(115);                  // 'different'
    }
    lookahead1W(132);               // S^WS | '(:' | 'paragraph' | 'sentence'
    try_FTBigUnit();
  }