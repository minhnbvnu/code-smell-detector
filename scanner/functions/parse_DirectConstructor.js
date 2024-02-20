function parse_DirectConstructor()
  {
    eventHandler.startNonterminal("DirectConstructor", e0);
    switch (l1)
    {
    case 54:                        // '<'
      parse_DirElemConstructor();
      break;
    case 55:                        // '<!--'
      parse_DirCommentConstructor();
      break;
    default:
      parse_DirPIConstructor();
    }
    eventHandler.endNonterminal("DirectConstructor", e0);
  }