function parse_Constructor()
  {
    eventHandler.startNonterminal("Constructor", e0);
    switch (l1)
    {
    case 54:                        // '<'
    case 55:                        // '<!--'
    case 59:                        // '<?'
      parse_DirectConstructor();
      break;
    default:
      parse_ComputedConstructor();
    }
    eventHandler.endNonterminal("Constructor", e0);
  }