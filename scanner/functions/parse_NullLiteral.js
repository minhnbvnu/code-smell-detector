function parse_NullLiteral()
  {
    eventHandler.startNonterminal("NullLiteral", e0);
    shift(197);                     // 'null'
    eventHandler.endNonterminal("NullLiteral", e0);
  }