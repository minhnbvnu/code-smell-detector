function parse_CountClause()
  {
    eventHandler.startNonterminal("CountClause", e0);
    shift(105);                     // 'count'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    eventHandler.endNonterminal("CountClause", e0);
  }