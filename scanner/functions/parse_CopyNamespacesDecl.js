function parse_CopyNamespacesDecl()
  {
    eventHandler.startNonterminal("CopyNamespacesDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(44);                // S^WS | '(:' | 'copy-namespaces'
    shift(104);                     // 'copy-namespaces'
    lookahead1W(128);               // S^WS | '(:' | 'no-preserve' | 'preserve'
    whitespace();
    parse_PreserveMode();
    lookahead1W(25);                // S^WS | '(:' | ','
    shift(41);                      // ','
    lookahead1W(123);               // S^WS | '(:' | 'inherit' | 'no-inherit'
    whitespace();
    parse_InheritMode();
    eventHandler.endNonterminal("CopyNamespacesDecl", e0);
  }