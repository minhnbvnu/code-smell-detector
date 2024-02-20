function parse_FTWeight()
  {
    eventHandler.startNonterminal("FTWeight", e0);
    shift(264);                     // 'weight'
    lookahead1W(87);                // S^WS | '(:' | '{'
    shift(276);                     // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(282);                     // '}'
    eventHandler.endNonterminal("FTWeight", e0);
  }