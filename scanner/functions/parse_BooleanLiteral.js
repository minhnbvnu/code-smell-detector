function parse_BooleanLiteral()
  {
    eventHandler.startNonterminal("BooleanLiteral", e0);
    switch (l1)
    {
    case 255:                       // 'true'
      shift(255);                   // 'true'
      break;
    default:
      shift(135);                   // 'false'
    }
    eventHandler.endNonterminal("BooleanLiteral", e0);
  }