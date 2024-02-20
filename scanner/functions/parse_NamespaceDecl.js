function parse_NamespaceDecl()
  {
    eventHandler.startNonterminal("NamespaceDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(61);                // S^WS | '(:' | 'namespace'
    shift(184);                     // 'namespace'
    lookahead1W(248);               // NCName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_NCName();
    lookahead1W(29);                // S^WS | '(:' | '='
    shift(60);                      // '='
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    eventHandler.endNonterminal("NamespaceDecl", e0);
  }