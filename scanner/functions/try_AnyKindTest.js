function try_AnyKindTest()
  {
    shiftT(191);                    // 'node'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }