function try_GeneralComp()
  {
    switch (l1)
    {
    case 60:                        // '='
      shiftT(60);                   // '='
      break;
    case 27:                        // '!='
      shiftT(27);                   // '!='
      break;
    case 54:                        // '<'
      shiftT(54);                   // '<'
      break;
    case 58:                        // '<='
      shiftT(58);                   // '<='
      break;
    case 61:                        // '>'
      shiftT(61);                   // '>'
      break;
    default:
      shiftT(62);                   // '>='
    }
  }