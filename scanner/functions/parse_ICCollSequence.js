function parse_ICCollSequence()
  {
    eventHandler.startNonterminal("ICCollSequence", e0);
    parse_VarRef();
    lookahead1W(37);                // S^WS | '(:' | 'check'
    shift(92);                      // 'check'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("ICCollSequence", e0);
  }