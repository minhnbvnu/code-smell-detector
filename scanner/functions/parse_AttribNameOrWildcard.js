function parse_AttribNameOrWildcard()
  {
    eventHandler.startNonterminal("AttribNameOrWildcard", e0);
    switch (l1)
    {
    case 38:                        // '*'
      shift(38);                    // '*'
      break;
    default:
      parse_AttributeName();
    }
    eventHandler.endNonterminal("AttribNameOrWildcard", e0);
  }