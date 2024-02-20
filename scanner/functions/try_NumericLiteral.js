function try_NumericLiteral()
  {
    switch (l1)
    {
    case 8:                         // IntegerLiteral
      shiftT(8);                    // IntegerLiteral
      break;
    case 9:                         // DecimalLiteral
      shiftT(9);                    // DecimalLiteral
      break;
    default:
      shiftT(10);                   // DoubleLiteral
    }
  }