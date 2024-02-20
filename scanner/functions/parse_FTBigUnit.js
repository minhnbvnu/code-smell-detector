function parse_FTBigUnit()
  {
    eventHandler.startNonterminal("FTBigUnit", e0);
    switch (l1)
    {
    case 231:                       // 'sentence'
      shift(231);                   // 'sentence'
      break;
    default:
      shift(204);                   // 'paragraph'
    }
    eventHandler.endNonterminal("FTBigUnit", e0);
  }