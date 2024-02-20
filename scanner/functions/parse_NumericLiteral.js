function parse_NumericLiteral()
  {
    eventHandler.startNonterminal("NumericLiteral", e0);
    switch (l1)
    {
    case 8:                         // IntegerLiteral
      shift(8);                     // IntegerLiteral
      break;
    case 9:                         // DecimalLiteral
      shift(9);                     // DecimalLiteral
      break;
    default:
      shift(10);                    // DoubleLiteral
    }
    eventHandler.endNonterminal("NumericLiteral", e0);
  }