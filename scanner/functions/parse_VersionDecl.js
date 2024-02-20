function parse_VersionDecl()
  {
    eventHandler.startNonterminal("VersionDecl", e0);
    shift(274);                     // 'xquery'
    lookahead1W(116);               // S^WS | '(:' | 'encoding' | 'version'
    switch (l1)
    {
    case 125:                       // 'encoding'
      shift(125);                   // 'encoding'
      lookahead1W(17);              // StringLiteral | S^WS | '(:'
      shift(11);                    // StringLiteral
      break;
    default:
      shift(263);                   // 'version'
      lookahead1W(17);              // StringLiteral | S^WS | '(:'
      shift(11);                    // StringLiteral
      lookahead1W(109);             // S^WS | '(:' | ';' | 'encoding'
      if (l1 == 125)                // 'encoding'
      {
        shift(125);                 // 'encoding'
        lookahead1W(17);            // StringLiteral | S^WS | '(:'
        shift(11);                  // StringLiteral
      }
    }
    lookahead1W(28);                // S^WS | '(:' | ';'
    whitespace();
    parse_Separator();
    eventHandler.endNonterminal("VersionDecl", e0);
  }