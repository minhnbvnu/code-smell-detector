function parse_LibraryModule()
  {
    eventHandler.startNonterminal("LibraryModule", e0);
    parse_ModuleDecl();
    lookahead1W(138);               // S^WS | EOF | '(:' | 'declare' | 'import'
    whitespace();
    parse_Prolog();
    eventHandler.endNonterminal("LibraryModule", e0);
  }