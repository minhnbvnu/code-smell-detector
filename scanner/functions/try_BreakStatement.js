function try_BreakStatement()
  {
    shiftT(86);                     // 'break'
    lookahead1W(59);                // S^WS | '(:' | 'loop'
    shiftT(176);                    // 'loop'
    lookahead1W(28);                // S^WS | '(:' | ';'
    shiftT(53);                     // ';'
  }