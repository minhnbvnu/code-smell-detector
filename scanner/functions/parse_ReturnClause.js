function parse_ReturnClause()
  {
    eventHandler.startNonterminal("ReturnClause", e0);
    shift(220);                     // 'return'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("ReturnClause", e0);
  }