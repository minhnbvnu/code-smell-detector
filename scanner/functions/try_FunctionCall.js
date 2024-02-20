function try_FunctionCall()
  {
    try_FunctionName();
    lookahead1W(22);                // S^WS | '(' | '(:'
    try_ArgumentList();
  }