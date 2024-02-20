function parse_FTContent()
  {
    eventHandler.startNonterminal("FTContent", e0);
    switch (l1)
    {
    case 81:                        // 'at'
      shift(81);                    // 'at'
      lookahead1W(117);             // S^WS | '(:' | 'end' | 'start'
      switch (l1)
      {
      case 237:                     // 'start'
        shift(237);                 // 'start'
        break;
      default:
        shift(126);                 // 'end'
      }
      break;
    default:
      shift(127);                   // 'entire'
      lookahead1W(42);              // S^WS | '(:' | 'content'
      shift(100);                   // 'content'
    }
    eventHandler.endNonterminal("FTContent", e0);
  }