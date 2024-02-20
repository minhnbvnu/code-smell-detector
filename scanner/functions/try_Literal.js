function try_Literal()
  {
    switch (l1)
    {
    case 11:                        // StringLiteral
      shiftT(11);                   // StringLiteral
      break;
    default:
      try_NumericLiteral();
    }
  }