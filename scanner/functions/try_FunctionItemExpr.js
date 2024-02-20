function try_FunctionItemExpr()
  {
    switch (l1)
    {
    case 145:                       // 'function'
      lookahead2W(92);              // S^WS | '#' | '(' | '(:'
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 32:                        // '%'
    case 17553:                     // 'function' '('
      try_InlineFunctionExpr();
      break;
    default:
      try_NamedFunctionRef();
    }
  }