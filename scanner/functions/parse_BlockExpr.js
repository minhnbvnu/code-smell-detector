function parse_BlockExpr()
  {
    eventHandler.startNonterminal("BlockExpr", e0);
    shift(276);                     // '{'
    lookahead1W(276);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_StatementsAndOptionalExpr();
    shift(282);                     // '}'
    eventHandler.endNonterminal("BlockExpr", e0);
  }