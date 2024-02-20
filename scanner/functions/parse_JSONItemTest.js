function parse_JSONItemTest()
  {
    eventHandler.startNonterminal("JSONItemTest", e0);
    shift(167);                     // 'json-item'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("JSONItemTest", e0);
  }