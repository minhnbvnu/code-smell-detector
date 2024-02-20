function parse_FTIgnoreOption()
  {
    eventHandler.startNonterminal("FTIgnoreOption", e0);
    shift(271);                     // 'without'
    lookahead1W(42);                // S^WS | '(:' | 'content'
    shift(100);                     // 'content'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_UnionExpr();
    eventHandler.endNonterminal("FTIgnoreOption", e0);
  }