function parse_ICForeignKeyTarget()
  {
    eventHandler.startNonterminal("ICForeignKeyTarget", e0);
    shift(248);                     // 'to'
    lookahead1W(39);                // S^WS | '(:' | 'collection'
    whitespace();
    parse_ICForeignKeyValues();
    eventHandler.endNonterminal("ICForeignKeyTarget", e0);
  }