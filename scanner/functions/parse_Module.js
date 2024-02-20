function parse_Module()
  {
    eventHandler.startNonterminal("Module", e0);
    switch (l1)
    {
    case 274:                       // 'xquery'
      lookahead2W(198);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
      break;
    default:
      lk = l1;
    }
    if (lk == 64274                 // 'xquery' 'encoding'
     || lk == 134930)               // 'xquery' 'version'
    {
      parse_VersionDecl();
    }
    lookahead1W(274);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    switch (l1)
    {
    case 182:                       // 'module'
      lookahead2W(193);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 94390:                     // 'module' 'namespace'
      whitespace();
      parse_LibraryModule();
      break;
    default:
      whitespace();
      parse_MainModule();
    }
    eventHandler.endNonterminal("Module", e0);
  }