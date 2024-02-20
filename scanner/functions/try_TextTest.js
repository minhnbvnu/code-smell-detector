function try_TextTest()
  {
    shiftT(244);                    // 'text'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }