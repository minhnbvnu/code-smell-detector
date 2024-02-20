function parse_AnyFunctionTest()
  {
    eventHandler.startNonterminal("AnyFunctionTest", e0);
    shift(145);                     // 'function'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(24);                // S^WS | '(:' | '*'
    shift(38);                      // '*'
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("AnyFunctionTest", e0);
  }