function parse_ICCollSequenceUnique()
  {
    eventHandler.startNonterminal("ICCollSequenceUnique", e0);
    shift(191);                     // 'node'
    lookahead1W(21);                // S^WS | '$' | '(:'
    whitespace();
    parse_VarRef();
    lookahead1W(37);                // S^WS | '(:' | 'check'
    shift(92);                      // 'check'
    lookahead1W(80);                // S^WS | '(:' | 'unique'
    shift(255);                     // 'unique'
    lookahead1W(57);                // S^WS | '(:' | 'key'
    shift(168);                     // 'key'
    lookahead1W(265);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_PathExpr();
    eventHandler.endNonterminal("ICCollSequenceUnique", e0);
  }