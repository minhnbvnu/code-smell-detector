function parse_BlockStatement()
  {
    eventHandler.startNonterminal("BlockStatement", e0);
    shift(276);                     // '{'
    lookahead1W(276);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statements();
    shift(282);                     // '}'
    eventHandler.endNonterminal("BlockStatement", e0);
  }