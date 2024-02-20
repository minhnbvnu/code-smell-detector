function parse_QuotAttrValueContent()
  {
    eventHandler.startNonterminal("QuotAttrValueContent", e0);
    switch (l1)
    {
    case 16:                        // QuotAttrContentChar
      shift(16);                    // QuotAttrContentChar
      break;
    default:
      parse_CommonContent();
    }
    eventHandler.endNonterminal("QuotAttrValueContent", e0);
  }