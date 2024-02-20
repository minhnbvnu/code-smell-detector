function try_FTUnaryNot()
  {
    if (l1 == 143)                  // 'ftnot'
    {
      shiftT(143);                  // 'ftnot'
    }
    lookahead1W(155);               // StringLiteral | S^WS | '(' | '(#' | '(:' | '{'
    try_FTPrimaryWithOptions();
  }