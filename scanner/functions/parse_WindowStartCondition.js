function parse_WindowStartCondition()
  {
    eventHandler.startNonterminal("WindowStartCondition", e0);
    shift(237);                     // 'start'
    lookahead1W(163);               // S^WS | '$' | '(:' | 'at' | 'next' | 'previous' | 'when'
    whitespace();
    parse_WindowVars();
    lookahead1W(83);                // S^WS | '(:' | 'when'
    shift(265);                     // 'when'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("WindowStartCondition", e0);
  }