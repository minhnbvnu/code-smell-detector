function parse_ReplaceExpr()
  {
    eventHandler.startNonterminal("ReplaceExpr", e0);
    shift(219);                     // 'replace'
    lookahead1W(130);               // S^WS | '(:' | 'node' | 'value'
    if (l1 == 261)                  // 'value'
    {
      shift(261);                   // 'value'
      lookahead1W(64);              // S^WS | '(:' | 'of'
      shift(196);                   // 'of'
    }
    lookahead1W(62);                // S^WS | '(:' | 'node'
    shift(191);                     // 'node'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_TargetExpr();
    shift(270);                     // 'with'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("ReplaceExpr", e0);
  }