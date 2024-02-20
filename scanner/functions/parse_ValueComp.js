function parse_ValueComp()
  {
    eventHandler.startNonterminal("ValueComp", e0);
    switch (l1)
    {
    case 128:                       // 'eq'
      shift(128);                   // 'eq'
      break;
    case 186:                       // 'ne'
      shift(186);                   // 'ne'
      break;
    case 178:                       // 'lt'
      shift(178);                   // 'lt'
      break;
    case 172:                       // 'le'
      shift(172);                   // 'le'
      break;
    case 150:                       // 'gt'
      shift(150);                   // 'gt'
      break;
    default:
      shift(146);                   // 'ge'
    }
    eventHandler.endNonterminal("ValueComp", e0);
  }