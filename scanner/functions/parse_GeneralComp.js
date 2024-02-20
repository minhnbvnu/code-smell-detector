function parse_GeneralComp()
  {
    eventHandler.startNonterminal("GeneralComp", e0);
    switch (l1)
    {
    case 60:                        // '='
      shift(60);                    // '='
      break;
    case 27:                        // '!='
      shift(27);                    // '!='
      break;
    case 54:                        // '<'
      shift(54);                    // '<'
      break;
    case 58:                        // '<='
      shift(58);                    // '<='
      break;
    case 61:                        // '>'
      shift(61);                    // '>'
      break;
    default:
      shift(62);                    // '>='
    }
    eventHandler.endNonterminal("GeneralComp", e0);
  }