function try_CommonContent()
  {
    switch (l1)
    {
    case 12:                        // PredefinedEntityRef
      shiftT(12);                   // PredefinedEntityRef
      break;
    case 23:                        // CharRef
      shiftT(23);                   // CharRef
      break;
    case 277:                       // '{{'
      shiftT(277);                  // '{{'
      break;
    case 283:                       // '}}'
      shiftT(283);                  // '}}'
      break;
    default:
      try_BlockExpr();
    }
  }