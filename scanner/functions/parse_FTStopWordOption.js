function parse_FTStopWordOption()
  {
    eventHandler.startNonterminal("FTStopWordOption", e0);
    switch (l1)
    {
    case 239:                       // 'stop'
      shift(239);                   // 'stop'
      lookahead1W(86);              // S^WS | '(:' | 'words'
      shift(273);                   // 'words'
      lookahead1W(142);             // S^WS | '(' | '(:' | 'at' | 'default'
      switch (l1)
      {
      case 109:                     // 'default'
        shift(109);                 // 'default'
        for (;;)
        {
          lookahead1W(217);         // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
          if (l1 != 131             // 'except'
           && l1 != 254)            // 'union'
          {
            break;
          }
          whitespace();
          parse_FTStopWordsInclExcl();
        }
        break;
      default:
        whitespace();
        parse_FTStopWords();
        for (;;)
        {
          lookahead1W(217);         // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
          if (l1 != 131             // 'except'
           && l1 != 254)            // 'union'
          {
            break;
          }
          whitespace();
          parse_FTStopWordsInclExcl();
        }
      }
      break;
    default:
      shift(188);                   // 'no'
      lookahead1W(75);              // S^WS | '(:' | 'stop'
      shift(239);                   // 'stop'
      lookahead1W(86);              // S^WS | '(:' | 'words'
      shift(273);                   // 'words'
    }
    eventHandler.endNonterminal("FTStopWordOption", e0);
  }