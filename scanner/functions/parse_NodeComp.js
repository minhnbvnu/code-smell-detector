function parse_NodeComp()
  {
    eventHandler.startNonterminal("NodeComp", e0);
    switch (l1)
    {
    case 164:                       // 'is'
      shift(164);                   // 'is'
      break;
    case 57:                        // '<<'
      shift(57);                    // '<<'
      break;
    default:
      shift(63);                    // '>>'
    }
    eventHandler.endNonterminal("NodeComp", e0);
  }