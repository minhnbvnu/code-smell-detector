function parse_IndexKeyCollation()
  {
    eventHandler.startNonterminal("IndexKeyCollation", e0);
    shift(94);                      // 'collation'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    eventHandler.endNonterminal("IndexKeyCollation", e0);
  }