function parse_DefaultNamespaceDecl()
  {
    eventHandler.startNonterminal("DefaultNamespaceDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(46);                // S^WS | '(:' | 'default'
    shift(109);                     // 'default'
    lookahead1W(115);               // S^WS | '(:' | 'element' | 'function'
    switch (l1)
    {
    case 121:                       // 'element'
      shift(121);                   // 'element'
      break;
    default:
      shift(145);                   // 'function'
    }
    lookahead1W(61);                // S^WS | '(:' | 'namespace'
    shift(184);                     // 'namespace'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    eventHandler.endNonterminal("DefaultNamespaceDecl", e0);
  }