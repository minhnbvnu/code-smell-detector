function parse_EnclosedExpr()
  {
    eventHandler.startNonterminal("EnclosedExpr", e0);
    shift(276);                     // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(282);                     // '}'
    eventHandler.endNonterminal("EnclosedExpr", e0);
  }