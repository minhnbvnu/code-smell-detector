function parse_DefaultCollationDecl()
  {
    eventHandler.startNonterminal("DefaultCollationDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(46);                // S^WS | '(:' | 'default'
    shift(109);                     // 'default'
    lookahead1W(38);                // S^WS | '(:' | 'collation'
    shift(94);                      // 'collation'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    eventHandler.endNonterminal("DefaultCollationDecl", e0);
  }