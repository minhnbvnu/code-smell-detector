function parse_DirElemConstructor()
  {
    eventHandler.startNonterminal("DirElemConstructor", e0);
    shift(54);                      // '<'
    lookahead1(4);                  // QName
    shift(20);                      // QName
    parse_DirAttributeList();
    switch (l1)
    {
    case 48:                        // '/>'
      shift(48);                    // '/>'
      break;
    default:
      shift(61);                    // '>'
      for (;;)
      {
        lookahead1(174);            // CDataSection | PredefinedEntityRef | ElementContentChar | CharRef | '<' |
        if (l1 == 56)               // '</'
        {
          break;
        }
        parse_DirElemContent();
      }
      shift(56);                    // '</'
      lookahead1(4);                // QName
      shift(20);                    // QName
      lookahead1(12);               // S | '>'
      if (l1 == 21)                 // S
      {
        shift(21);                  // S
      }
      lookahead1(8);                // '>'
      shift(61);                    // '>'
    }
    eventHandler.endNonterminal("DirElemConstructor", e0);
  }