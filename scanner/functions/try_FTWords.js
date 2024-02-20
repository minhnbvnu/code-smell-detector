function try_FTWords()
  {
    try_FTWordsValue();
    lookahead1W(221);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    if (l1 == 71                    // 'all'
     || l1 == 76                    // 'any'
     || l1 == 210)                  // 'phrase'
    {
      try_FTAnyallOption();
    }
  }