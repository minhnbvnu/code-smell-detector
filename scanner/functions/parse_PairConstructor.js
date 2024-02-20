function parse_PairConstructor()
  {
    eventHandler.startNonterminal("PairConstructor", e0);
    parse_ExprSingle();
    shift(49);                      // ':'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("PairConstructor", e0);
  }