function try_AttribNameOrWildcard()
  {
    switch (l1)
    {
    case 38:                        // '*'
      shiftT(38);                   // '*'
      break;
    default:
      try_AttributeName();
    }
  }