function parse_OrderedExpr()
  {
    eventHandler.startNonterminal("OrderedExpr", e0);
    shift(202);                     // 'ordered'
    lookahead1W(87);                // S^WS | '(:' | '{'
    shift(276);                     // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(282);                     // '}'
    eventHandler.endNonterminal("OrderedExpr", e0);
  }