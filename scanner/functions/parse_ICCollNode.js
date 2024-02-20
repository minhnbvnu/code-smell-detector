function parse_ICCollNode()
  {
    eventHandler.startNonterminal("ICCollNode", e0);
    shift(138);                     // 'foreach'
    lookahead1W(62);                // S^WS | '(:' | 'node'
    shift(191);                     // 'node'
    lookahead1W(21);                // S^WS | '$' | '(:'
    whitespace();
    parse_VarRef();
    lookahead1W(37);                // S^WS | '(:' | 'check'
    shift(92);                      // 'check'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("ICCollNode", e0);
  }