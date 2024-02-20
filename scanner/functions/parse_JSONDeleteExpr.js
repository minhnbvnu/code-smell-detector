function parse_JSONDeleteExpr()
  {
    eventHandler.startNonterminal("JSONDeleteExpr", e0);
    shift(110);                     // 'delete'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shift(166);                     // 'json'
    lookahead1W(263);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    whitespace();
    parse_PostfixExpr();
    eventHandler.endNonterminal("JSONDeleteExpr", e0);
  }