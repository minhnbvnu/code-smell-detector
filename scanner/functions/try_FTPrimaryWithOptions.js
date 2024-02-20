function try_FTPrimaryWithOptions()
  {
    try_FTPrimary();
    lookahead1W(214);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    if (l1 == 259)                  // 'using'
    {
      try_FTMatchOptions();
    }
    if (l1 == 264)                  // 'weight'
    {
      try_FTWeight();
    }
  }