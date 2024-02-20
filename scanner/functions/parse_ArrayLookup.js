function parse_ArrayLookup()
  {
    eventHandler.startNonterminal("ArrayLookup", e0);
    shift(69);                      // '['
    lookahead1W(31);                // S^WS | '(:' | '['
    shift(69);                      // '['
    lookahead1W(266);               // EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral |
    whitespace();
    parse_Expr();
    shift(70);                      // ']'
    lookahead1W(32);                // S^WS | '(:' | ']'
    shift(70);                      // ']'
    eventHandler.endNonterminal("ArrayLookup", e0);
  }