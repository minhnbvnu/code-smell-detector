function try_FTAnyallOption()
  {
    switch (l1)
    {
    case 76:                        // 'any'
      shiftT(76);                   // 'any'
      lookahead1W(218);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 == 272)                // 'word'
      {
        shiftT(272);                // 'word'
      }
      break;
    case 71:                        // 'all'
      shiftT(71);                   // 'all'
      lookahead1W(219);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 == 273)                // 'words'
      {
        shiftT(273);                // 'words'
      }
      break;
    default:
      shiftT(210);                  // 'phrase'
    }
  }