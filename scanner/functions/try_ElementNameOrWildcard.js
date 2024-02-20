function try_ElementNameOrWildcard()
  {
    switch (l1)
    {
    case 38:                        // '*'
      shiftT(38);                   // '*'
      break;
    default:
      try_ElementName();
    }
  }