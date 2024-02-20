function parse_ValidationMode()
  {
    eventHandler.startNonterminal("ValidationMode", e0);
    switch (l1)
    {
    case 171:                       // 'lax'
      shift(171);                   // 'lax'
      break;
    default:
      shift(240);                   // 'strict'
    }
    eventHandler.endNonterminal("ValidationMode", e0);
  }