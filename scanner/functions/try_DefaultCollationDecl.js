function try_DefaultCollationDecl()
  {
    shiftT(108);                    // 'declare'
    lookahead1W(46);                // S^WS | '(:' | 'default'
    shiftT(109);                    // 'default'
    lookahead1W(38);                // S^WS | '(:' | 'collation'
    shiftT(94);                     // 'collation'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shiftT(7);                      // URILiteral
  }