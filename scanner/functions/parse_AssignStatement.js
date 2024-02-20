function parse_AssignStatement()
  {
    eventHandler.startNonterminal("AssignStatement", e0);
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    lookahead1W(27);                // S^WS | '(:' | ':='
    shift(52);                      // ':='
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    shift(53);                      // ';'
    eventHandler.endNonterminal("AssignStatement", e0);
  }