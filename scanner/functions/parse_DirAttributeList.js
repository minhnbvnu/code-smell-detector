function parse_DirAttributeList()
  {
    eventHandler.startNonterminal("DirAttributeList", e0);
    for (;;)
    {
      lookahead1(19);               // S | '/>' | '>'
      if (l1 != 21)                 // S
      {
        break;
      }
      shift(21);                    // S
      lookahead1(91);               // QName | S | '/>' | '>'
      if (l1 == 20)                 // QName
      {
        shift(20);                  // QName
        lookahead1(11);             // S | '='
        if (l1 == 21)               // S
        {
          shift(21);                // S
        }
        lookahead1(7);              // '='
        shift(60);                  // '='
        lookahead1(18);             // S | '"' | "'"
        if (l1 == 21)               // S
        {
          shift(21);                // S
        }
        parse_DirAttributeValue();
      }
    }
    eventHandler.endNonterminal("DirAttributeList", e0);
  }