function parse_JSONAppendExpr()
  {
    eventHandler.startNonterminal("JSONAppendExpr", e0);
    shift(77);                      // 'append'
    lookahead1W(56);                // S^WS | '(:' | 'json'
    shift(166);                     // 'json'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    shift(163);                     // 'into'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("JSONAppendExpr", e0);
  }