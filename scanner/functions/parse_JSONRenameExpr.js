function parse_JSONRenameExpr()
  {
    eventHandler.startNonterminal("JSONRenameExpr", e0);
    shift(218);                     // 'rename'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shift(166);                     // 'json'
    lookahead1W(263);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    whitespace();
    parse_PostfixExpr();
    shift(79);                      // 'as'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("JSONRenameExpr", e0);
  }