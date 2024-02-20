function parse_Literal()
  {
    eventHandler.startNonterminal("Literal", e0);
    switch (l1)
    {
    case 11:                        // StringLiteral
      shift(11);                    // StringLiteral
      break;
    default:
      parse_NumericLiteral();
    }
    eventHandler.endNonterminal("Literal", e0);
  }