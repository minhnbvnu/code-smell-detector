function try_NameTest()
  {
    switch (l1)
    {
    case 5:                         // Wildcard
      shiftT(5);                    // Wildcard
      break;
    default:
      try_EQName();
    }
  }