function try_DefaultNamespaceDecl()
  {
    shiftT(108);                    // 'declare'
    lookahead1W(46);                // S^WS | '(:' | 'default'
    shiftT(109);                    // 'default'
    lookahead1W(115);               // S^WS | '(:' | 'element' | 'function'
    switch (l1)
    {
    case 121:                       // 'element'
      shiftT(121);                  // 'element'
      break;
    default:
      shiftT(145);                  // 'function'
    }
    lookahead1W(61);                // S^WS | '(:' | 'namespace'
    shiftT(184);                    // 'namespace'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shiftT(7);                      // URILiteral
  }