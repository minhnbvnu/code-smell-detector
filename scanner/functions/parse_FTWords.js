function parse_FTWords()
  {
    eventHandler.startNonterminal("FTWords", e0);
    parse_FTWordsValue();
    lookahead1W(221);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    if (l1 == 71                    // 'all'
     || l1 == 76                    // 'any'
     || l1 == 210)                  // 'phrase'
    {
      whitespace();
      parse_FTAnyallOption();
    }
    eventHandler.endNonterminal("FTWords", e0);
  }