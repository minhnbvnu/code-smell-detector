function parse_JSONObjectTest()
  {
    eventHandler.startNonterminal("JSONObjectTest", e0);
    shift(194);                     // 'object'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("JSONObjectTest", e0);
  }