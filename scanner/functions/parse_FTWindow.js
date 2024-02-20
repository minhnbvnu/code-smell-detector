function parse_FTWindow()
  {
    eventHandler.startNonterminal("FTWindow", e0);
    shift(269);                     // 'window'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_AdditiveExpr();
    whitespace();
    parse_FTUnit();
    eventHandler.endNonterminal("FTWindow", e0);
  }