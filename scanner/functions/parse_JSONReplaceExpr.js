function parse_JSONReplaceExpr()
  {
    eventHandler.startNonterminal("JSONReplaceExpr", e0);
    shift(219);                     // 'replace'
    lookahead1W(82);                // S^WS | '(:' | 'value'
    shift(261);                     // 'value'
    lookahead1W(64);                // S^WS | '(:' | 'of'
    shift(196);                     // 'of'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shift(166);                     // 'json'
    lookahead1W(263);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    whitespace();
    parse_PostfixExpr();
    shift(270);                     // 'with'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("JSONReplaceExpr", e0);
  }