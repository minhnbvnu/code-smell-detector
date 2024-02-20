function try_ValueComp()
  {
    switch (l1)
    {
    case 128:                       // 'eq'
      shiftT(128);                  // 'eq'
      break;
    case 186:                       // 'ne'
      shiftT(186);                  // 'ne'
      break;
    case 178:                       // 'lt'
      shiftT(178);                  // 'lt'
      break;
    case 172:                       // 'le'
      shiftT(172);                  // 'le'
      break;
    case 150:                       // 'gt'
      shiftT(150);                  // 'gt'
      break;
    default:
      shiftT(146);                  // 'ge'
    }
  }