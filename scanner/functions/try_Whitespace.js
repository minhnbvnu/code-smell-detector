function try_Whitespace()
  {
    switch (l1)
    {
    case 22:                        // S^WS
      shiftT(22);                   // S^WS
      break;
    default:
      try_Comment();
    }
  }