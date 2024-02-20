function parse_FTPrimaryWithOptions()
  {
    eventHandler.startNonterminal("FTPrimaryWithOptions", e0);
    parse_FTPrimary();
    lookahead1W(214);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    if (l1 == 259)                  // 'using'
    {
      whitespace();
      parse_FTMatchOptions();
    }
    if (l1 == 264)                  // 'weight'
    {
      whitespace();
      parse_FTWeight();
    }
    eventHandler.endNonterminal("FTPrimaryWithOptions", e0);
  }