function parse_FTPosFilter()
  {
    eventHandler.startNonterminal("FTPosFilter", e0);
    switch (l1)
    {
    case 202:                       // 'ordered'
      parse_FTOrder();
      break;
    case 269:                       // 'window'
      parse_FTWindow();
      break;
    case 117:                       // 'distance'
      parse_FTDistance();
      break;
    case 115:                       // 'different'
    case 223:                       // 'same'
      parse_FTScope();
      break;
    default:
      parse_FTContent();
    }
    eventHandler.endNonterminal("FTPosFilter", e0);
  }