function parse_FTUnit()
  {
    eventHandler.startNonterminal("FTUnit", e0);
    switch (l1)
    {
    case 273:                       // 'words'
      shift(273);                   // 'words'
      break;
    case 232:                       // 'sentences'
      shift(232);                   // 'sentences'
      break;
    default:
      shift(205);                   // 'paragraphs'
    }
    eventHandler.endNonterminal("FTUnit", e0);
  }