function parse_ReturnStatement()
  {
    eventHandler.startNonterminal("ReturnStatement", e0);
    shift(220);                     // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statement();
    eventHandler.endNonterminal("ReturnStatement", e0);
  }