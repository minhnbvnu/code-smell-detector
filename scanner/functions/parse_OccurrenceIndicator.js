function parse_OccurrenceIndicator()
  {
    eventHandler.startNonterminal("OccurrenceIndicator", e0);
    switch (l1)
    {
    case 64:                        // '?'
      shift(64);                    // '?'
      break;
    case 39:                        // '*'
      shift(39);                    // '*'
      break;
    default:
      shift(40);                    // '+'
    }
    eventHandler.endNonterminal("OccurrenceIndicator", e0);
  }