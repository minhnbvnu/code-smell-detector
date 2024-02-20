function try_AnyFunctionTest()
  {
    shiftT(145);                    // 'function'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(24);                // S^WS | '(:' | '*'
    shiftT(38);                     // '*'
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }