function try_CompCommentConstructor()
  {
    shiftT(96);                     // 'comment'
    lookahead1W(87);                // S^WS | '(:' | '{'
    try_BlockExpr();
  }