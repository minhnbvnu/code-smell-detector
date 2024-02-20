function parse_ElementNameOrWildcard()
  {
    eventHandler.startNonterminal("ElementNameOrWildcard", e0);
    switch (l1)
    {
    case 38:                        // '*'
      shift(38);                    // '*'
      break;
    default:
      parse_ElementName();
    }
    eventHandler.endNonterminal("ElementNameOrWildcard", e0);
  }