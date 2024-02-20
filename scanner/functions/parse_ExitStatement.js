function parse_ExitStatement()
  {
    eventHandler.startNonterminal("ExitStatement", e0);
    shift(132);                     // 'exit'
    lookahead1W(71);                // S^WS | '(:' | 'returning'
    shift(221);                     // 'returning'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    shift(53);                      // ';'
    eventHandler.endNonterminal("ExitStatement", e0);
  }