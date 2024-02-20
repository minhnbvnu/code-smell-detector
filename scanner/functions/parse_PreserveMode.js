function parse_PreserveMode()
  {
    eventHandler.startNonterminal("PreserveMode", e0);
    switch (l1)
    {
    case 214:                       // 'preserve'
      shift(214);                   // 'preserve'
      break;
    default:
      shift(190);                   // 'no-preserve'
    }
    eventHandler.endNonterminal("PreserveMode", e0);
  }