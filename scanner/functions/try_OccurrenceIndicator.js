function try_OccurrenceIndicator()
  {
    switch (l1)
    {
    case 64:                        // '?'
      shiftT(64);                   // '?'
      break;
    case 39:                        // '*'
      shiftT(39);                   // '*'
      break;
    default:
      shiftT(40);                   // '+'
    }
  }