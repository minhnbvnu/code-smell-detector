function try_ValidationMode()
  {
    switch (l1)
    {
    case 171:                       // 'lax'
      shiftT(171);                  // 'lax'
      break;
    default:
      shiftT(240);                  // 'strict'
    }
  }