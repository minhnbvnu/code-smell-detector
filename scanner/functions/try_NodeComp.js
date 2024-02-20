function try_NodeComp()
  {
    switch (l1)
    {
    case 164:                       // 'is'
      shiftT(164);                  // 'is'
      break;
    case 57:                        // '<<'
      shiftT(57);                   // '<<'
      break;
    default:
      shiftT(63);                   // '>>'
    }
  }