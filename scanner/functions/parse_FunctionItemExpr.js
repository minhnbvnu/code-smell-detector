function parse_FunctionItemExpr()
  {
    eventHandler.startNonterminal("FunctionItemExpr", e0);
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
      parse_InlineFunctionExpr();
      break;
    default:
      parse_NamedFunctionRef();
    }
    eventHandler.endNonterminal("FunctionItemExpr", e0);
  }