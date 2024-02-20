function parse_ICForeignKeySource()
  {
    eventHandler.startNonterminal("ICForeignKeySource", e0);
    shift(140);                     // 'from'
    lookahead1W(39);                // S^WS | '(:' | 'collection'
    whitespace();
    parse_ICForeignKeyValues();
    eventHandler.endNonterminal("ICForeignKeySource", e0);
  }