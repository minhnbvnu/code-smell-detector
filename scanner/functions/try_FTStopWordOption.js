function try_FTStopWordOption()
  {
    switch (l1)
    {
    case 239:                       // 'stop'
      shiftT(239);                  // 'stop'
      lookahead1W(86);              // S^WS | '(:' | 'words'
      shiftT(273);                  // 'words'
      lookahead1W(142);             // S^WS | '(' | '(:' | 'at' | 'default'
      switch (l1)
      {
      case 109:                     // 'default'
        shiftT(109);                // 'default'
        for (;;)
        {
          lookahead1W(217);         // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
          if (l1 != 131             // 'except'
           && l1 != 254)            // 'union'
          {
            break;
          }
          try_FTStopWordsInclExcl();
        }
        break;
      default:
        try_FTStopWords();
        for (;;)
        {
          lookahead1W(217);         // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
          if (l1 != 131             // 'except'
           && l1 != 254)            // 'union'
          {
            break;
          }
          try_FTStopWordsInclExcl();
        }
      }
      break;
    default:
      shiftT(188);                  // 'no'
      lookahead1W(75);              // S^WS | '(:' | 'stop'
      shiftT(239);                  // 'stop'
      lookahead1W(86);              // S^WS | '(:' | 'words'
      shiftT(273);                  // 'words'
    }
  }