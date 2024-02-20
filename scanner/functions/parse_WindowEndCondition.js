function parse_WindowEndCondition()
  {
    eventHandler.startNonterminal("WindowEndCondition", e0);
    if (l1 == 198)                  // 'only'
    {
      shift(198);                   // 'only'
    }
    lookahead1W(50);                // S^WS | '(:' | 'end'
    shift(126);                     // 'end'
    lookahead1W(163);               // S^WS | '$' | '(:' | 'at' | 'next' | 'previous' | 'when'
    whitespace();
    parse_WindowVars();
    lookahead1W(83);                // S^WS | '(:' | 'when'
    shift(265);                     // 'when'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("WindowEndCondition", e0);
  }