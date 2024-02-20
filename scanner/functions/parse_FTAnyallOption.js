function parse_FTAnyallOption()
  {
    eventHandler.startNonterminal("FTAnyallOption", e0);
    switch (l1)
    {
    case 76:                        // 'any'
      shift(76);                    // 'any'
      lookahead1W(218);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 == 272)                // 'word'
      {
        shift(272);                 // 'word'
      }
      break;
    case 71:                        // 'all'
      shift(71);                    // 'all'
      lookahead1W(219);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 == 273)                // 'words'
      {
        shift(273);                 // 'words'
      }
      break;
    default:
      shift(210);                   // 'phrase'
    }
    eventHandler.endNonterminal("FTAnyallOption", e0);
  }