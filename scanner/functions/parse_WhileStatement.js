function parse_WhileStatement()
  {
    eventHandler.startNonterminal("WhileStatement", e0);
    shift(267);                     // 'while'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(37);                      // ')'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statement();
    eventHandler.endNonterminal("WhileStatement", e0);
  }