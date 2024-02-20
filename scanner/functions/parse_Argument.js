function parse_Argument()
  {
    eventHandler.startNonterminal("Argument", e0);
    switch (l1)
    {
    case 64:                        // '?'
      parse_ArgumentPlaceholder();
      break;
    default:
      parse_ExprSingle();
    }
    eventHandler.endNonterminal("Argument", e0);
  }