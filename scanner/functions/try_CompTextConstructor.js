function try_CompTextConstructor()
  {
    shiftT(244);                    // 'text'
    lookahead1W(87);                // S^WS | '(:' | '{'
    try_BlockExpr();
  }