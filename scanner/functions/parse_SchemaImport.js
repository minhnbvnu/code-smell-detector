function parse_SchemaImport()
  {
    eventHandler.startNonterminal("SchemaImport", e0);
    shift(153);                     // 'import'
    lookahead1W(73);                // S^WS | '(:' | 'schema'
    shift(225);                     // 'schema'
    lookahead1W(137);               // URILiteral | S^WS | '(:' | 'default' | 'namespace'
    if (l1 != 7)                    // URILiteral
    {
      whitespace();
      parse_SchemaPrefix();
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
    eventHandler.endNonterminal("SchemaImport", e0);
  }