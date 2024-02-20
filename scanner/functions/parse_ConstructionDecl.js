function parse_ConstructionDecl()
  {
    eventHandler.startNonterminal("ConstructionDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(41);                // S^WS | '(:' | 'construction'
    shift(98);                      // 'construction'
    lookahead1W(133);               // S^WS | '(:' | 'preserve' | 'strip'
    switch (l1)
    {
    case 241:                       // 'strip'
      shift(241);                   // 'strip'
      break;
    default:
      shift(214);                   // 'preserve'
    }
    eventHandler.endNonterminal("ConstructionDecl", e0);
  }