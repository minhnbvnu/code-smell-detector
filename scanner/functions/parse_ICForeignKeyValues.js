function parse_ICForeignKeyValues()
  {
    eventHandler.startNonterminal("ICForeignKeyValues", e0);
    shift(95);                      // 'collection'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(62);                // S^WS | '(:' | 'node'
    shift(191);                     // 'node'
    lookahead1W(21);                // S^WS | '$' | '(:'
    whitespace();
    parse_VarRef();
    lookahead1W(57);                // S^WS | '(:' | 'key'
    shift(168);                     // 'key'
    lookahead1W(265);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_PathExpr();
    eventHandler.endNonterminal("ICForeignKeyValues", e0);
  }