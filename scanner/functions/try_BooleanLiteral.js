function try_BooleanLiteral()
  {
    switch (l1)
    {
    case 255:                       // 'true'
      shiftT(255);                  // 'true'
      break;
    default:
      shiftT(135);                  // 'false'
    }
  }