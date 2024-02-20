function try_FTContent()
  {
    switch (l1)
    {
    case 81:                        // 'at'
      shiftT(81);                   // 'at'
      lookahead1W(117);             // S^WS | '(:' | 'end' | 'start'
      switch (l1)
      {
      case 237:                     // 'start'
        shiftT(237);                // 'start'
        break;
      default:
        shiftT(126);                // 'end'
      }
      break;
    default:
      shiftT(127);                  // 'entire'
      lookahead1W(42);              // S^WS | '(:' | 'content'
      shiftT(100);                  // 'content'
    }
  }