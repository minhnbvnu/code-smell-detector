function parse_BaseURIDecl()
  {
    eventHandler.startNonterminal("BaseURIDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(32);                // S^WS | '(:' | 'base-uri'
    shift(83);                      // 'base-uri'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    eventHandler.endNonterminal("BaseURIDecl", e0);
  }