function parse_InheritMode()
  {
    eventHandler.startNonterminal("InheritMode", e0);
    switch (l1)
    {
    case 157:                       // 'inherit'
      shift(157);                   // 'inherit'
      break;
    default:
      shift(189);                   // 'no-inherit'
    }
    eventHandler.endNonterminal("InheritMode", e0);
  }