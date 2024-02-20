function parse_StructuredItemTest()
  {
    eventHandler.startNonterminal("StructuredItemTest", e0);
    shift(242);                     // 'structured-item'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("StructuredItemTest", e0);
  }