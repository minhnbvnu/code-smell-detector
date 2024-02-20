function parse_ModuleDecl()
  {
    eventHandler.startNonterminal("ModuleDecl", e0);
    shift(182);                     // 'module'
    lookahead1W(61);                // S^WS | '(:' | 'namespace'
    shift(184);                     // 'namespace'
    lookahead1W(248);               // NCName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_NCName();
    lookahead1W(29);                // S^WS | '(:' | '='
    shift(60);                      // '='
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    lookahead1W(28);                // S^WS | '(:' | ';'
    whitespace();
    parse_Separator();
    eventHandler.endNonterminal("ModuleDecl", e0);
  }