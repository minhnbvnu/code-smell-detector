function parse_BoundarySpaceDecl()
  {
    eventHandler.startNonterminal("BoundarySpaceDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(33);                // S^WS | '(:' | 'boundary-space'
    shift(85);                      // 'boundary-space'
    lookahead1W(133);               // S^WS | '(:' | 'preserve' | 'strip'
    switch (l1)
    {
    case 214:                       // 'preserve'
      shift(214);                   // 'preserve'
      break;
    default:
      shift(241);                   // 'strip'
    }
    eventHandler.endNonterminal("BoundarySpaceDecl", e0);
  }