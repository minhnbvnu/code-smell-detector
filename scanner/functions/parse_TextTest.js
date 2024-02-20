function parse_TextTest()
  {
    eventHandler.startNonterminal("TextTest", e0);
    shift(244);                     // 'text'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("TextTest", e0);
  }