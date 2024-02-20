function parse_ICForeignKey()
  {
    eventHandler.startNonterminal("ICForeignKey", e0);
    shift(139);                     // 'foreign'
    lookahead1W(57);                // S^WS | '(:' | 'key'
    shift(168);                     // 'key'
    lookahead1W(51);                // S^WS | '(:' | 'from'
    whitespace();
    parse_ICForeignKeySource();
    whitespace();
    parse_ICForeignKeyTarget();
    eventHandler.endNonterminal("ICForeignKey", e0);
  }