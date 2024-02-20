function try_FTMatchOptions()
  {
    for (;;)
    {
      shiftT(259);                  // 'using'
      lookahead1W(181);             // S^WS | '(:' | 'case' | 'diacritics' | 'language' | 'lowercase' | 'no' |
      try_FTMatchOption();
      lookahead1W(214);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 != 259)                // 'using'
      {
        break;
      }
    }
  }