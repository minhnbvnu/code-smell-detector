function try_JSONItemTest()
  {
    shiftT(167);                    // 'json-item'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }