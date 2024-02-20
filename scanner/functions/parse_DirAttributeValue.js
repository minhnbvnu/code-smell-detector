function parse_DirAttributeValue()
  {
    eventHandler.startNonterminal("DirAttributeValue", e0);
    lookahead1(14);                 // '"' | "'"
    switch (l1)
    {
    case 28:                        // '"'
      shift(28);                    // '"'
      for (;;)
      {
        lookahead1(167);            // PredefinedEntityRef | EscapeQuot | QuotAttrContentChar | CharRef | '"' | '{' |
        if (l1 == 28)               // '"'
        {
          break;
        }
        switch (l1)
        {
        case 13:                    // EscapeQuot
          shift(13);                // EscapeQuot
          break;
        default:
          parse_QuotAttrValueContent();
        }
      }
      shift(28);                    // '"'
      break;
    default:
      shift(33);                    // "'"
      for (;;)
      {
        lookahead1(168);            // PredefinedEntityRef | EscapeApos | AposAttrContentChar | CharRef | "'" | '{' |
        if (l1 == 33)               // "'"
        {
          break;
        }
        switch (l1)
        {
        case 14:                    // EscapeApos
          shift(14);                // EscapeApos
          break;
        default:
          parse_AposAttrValueContent();
        }
      }
      shift(33);                    // "'"
    }
    eventHandler.endNonterminal("DirAttributeValue", e0);
  }