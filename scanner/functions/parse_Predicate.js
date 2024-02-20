function parse_Predicate()
  {
    eventHandler.startNonterminal("Predicate", e0);
    shift(68);                      // '['
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(69);                      // ']'
    eventHandler.endNonterminal("Predicate", e0);
  }