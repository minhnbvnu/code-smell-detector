function parse_CommonContent()
  {
    eventHandler.startNonterminal("CommonContent", e0);
    switch (l1)
    {
    case 12:                        // PredefinedEntityRef
      shift(12);                    // PredefinedEntityRef
      break;
    case 23:                        // CharRef
      shift(23);                    // CharRef
      break;
    case 277:                       // '{{'
      shift(277);                   // '{{'
      break;
    case 283:                       // '}}'
      shift(283);                   // '}}'
      break;
    default:
      parse_BlockExpr();
    }
    eventHandler.endNonterminal("CommonContent", e0);
  }