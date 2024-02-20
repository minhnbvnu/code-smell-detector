function parse_ArrayConstructor()
  {
    eventHandler.startNonterminal("ArrayConstructor", e0);
    shift(68);                      // '['
    lookahead1W(271);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 69)                   // ']'
    {
      whitespace();
      parse_Expr();
    }
    shift(69);                      // ']'
    eventHandler.endNonterminal("ArrayConstructor", e0);
  }