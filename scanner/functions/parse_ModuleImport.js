function parse_ModuleImport()
  {
    eventHandler.startNonterminal("ModuleImport", e0);
    shift(153);                     // 'import'
    lookahead1W(60);                // S^WS | '(:' | 'module'
    shift(182);                     // 'module'
    lookahead1W(90);                // URILiteral | S^WS | '(:' | 'namespace'
    if (l1 == 184)                  // 'namespace'
    {
      shift(184);                   // 'namespace'
      lookahead1W(248);             // NCName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_NCName();
      lookahead1W(29);              // S^WS | '(:' | '='
      shift(60);                    // '='
    }
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    lookahead1W(108);               // S^WS | '(:' | ';' | 'at'
    if (l1 == 81)                   // 'at'
    {
      shift(81);                    // 'at'
      lookahead1W(15);              // URILiteral | S^WS | '(:'
      shift(7);                     // URILiteral
      for (;;)
      {
        lookahead1W(103);           // S^WS | '(:' | ',' | ';'
        if (l1 != 41)               // ','
        {
          break;
        }
        shift(41);                  // ','
        lookahead1W(15);            // URILiteral | S^WS | '(:'
        shift(7);                   // URILiteral
      }
    }
    eventHandler.endNonterminal("ModuleImport", e0);
  }