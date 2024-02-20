function parse_IfStatement()
  {
    eventHandler.startNonterminal("IfStatement", e0);
    shift(152);                     // 'if'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(37);                      // ')'
    lookahead1W(77);                // S^WS | '(:' | 'then'
    shift(245);                     // 'then'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statement();
    lookahead1W(48);                // S^WS | '(:' | 'else'
    shift(122);                     // 'else'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statement();
    eventHandler.endNonterminal("IfStatement", e0);
  }