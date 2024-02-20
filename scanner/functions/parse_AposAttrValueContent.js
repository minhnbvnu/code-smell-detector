function parse_AposAttrValueContent()
  {
    eventHandler.startNonterminal("AposAttrValueContent", e0);
    switch (l1)
    {
    case 17:                        // AposAttrContentChar
      shift(17);                    // AposAttrContentChar
      break;
    default:
      parse_CommonContent();
    }
    eventHandler.endNonterminal("AposAttrValueContent", e0);
  }