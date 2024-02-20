function parse_AnyKindTest()
  {
    eventHandler.startNonterminal("AnyKindTest", e0);
    shift(191);                     // 'node'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("AnyKindTest", e0);
  }