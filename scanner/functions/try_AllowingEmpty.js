function try_AllowingEmpty()
  {
    shiftT(72);                     // 'allowing'
    lookahead1W(49);                // S^WS | '(:' | 'empty'
    shiftT(123);                    // 'empty'
  }