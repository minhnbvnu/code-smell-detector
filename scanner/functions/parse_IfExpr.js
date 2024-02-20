function parse_IfExpr()
  {
    eventHandler.startNonterminal("IfExpr", e0);
    shift(152);                     // 'if'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(37);                      // ')'
    lookahead1W(77);                // S^WS | '(:' | 'then'
    shift(245);                     // 'then'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    shift(122);                     // 'else'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("IfExpr", e0);
  }