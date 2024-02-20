function try_CompDocConstructor()
  {
    shiftT(119);                    // 'document'
    lookahead1W(87);                // S^WS | '(:' | '{'
    try_BlockExpr();
  }