function parse_FTSelection()
  {
    eventHandler.startNonterminal("FTSelection", e0);
    parse_FTOr();
    for (;;)
    {
      lookahead1W(211);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      switch (l1)
      {
      case 81:                      // 'at'
        lookahead2W(151);           // S^WS | '(:' | 'end' | 'position' | 'start'
        break;
      default:
        lk = l1;
      }
      if (lk != 115                 // 'different'
       && lk != 117                 // 'distance'
       && lk != 127                 // 'entire'
       && lk != 202                 // 'ordered'
       && lk != 223                 // 'same'
       && lk != 269                 // 'window'
       && lk != 64593               // 'at' 'end'
       && lk != 121425)             // 'at' 'start'
      {
        break;
      }
      whitespace();
      parse_FTPosFilter();
    }
    eventHandler.endNonterminal("FTSelection", e0);
  }