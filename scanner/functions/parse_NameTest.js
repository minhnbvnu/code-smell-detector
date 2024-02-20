function parse_NameTest()
  {
    eventHandler.startNonterminal("NameTest", e0);
    switch (l1)
    {
    case 5:                         // Wildcard
      shift(5);                     // Wildcard
      break;
    default:
      parse_EQName();
    }
    eventHandler.endNonterminal("NameTest", e0);
  }