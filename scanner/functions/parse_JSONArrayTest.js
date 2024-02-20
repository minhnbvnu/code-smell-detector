function parse_JSONArrayTest()
  {
    eventHandler.startNonterminal("JSONArrayTest", e0);
    shift(78);                      // 'array'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("JSONArrayTest", e0);
  }