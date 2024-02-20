function parse_FTMatchOptions()
  {
    eventHandler.startNonterminal("FTMatchOptions", e0);
    for (;;)
    {
      shift(259);                   // 'using'
      lookahead1W(181);             // S^WS | '(:' | 'case' | 'diacritics' | 'language' | 'lowercase' | 'no' |
      whitespace();
      parse_FTMatchOption();
      lookahead1W(214);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 != 259)                // 'using'
      {
        break;
      }
    }
    eventHandler.endNonterminal("FTMatchOptions", e0);
  }