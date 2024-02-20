function try_NamedFunctionRef()
  {
    try_EQName();
    lookahead1W(20);                // S^WS | '#' | '(:'
    shiftT(29);                     // '#'
    lookahead1W(16);                // IntegerLiteral | S^WS | '(:'
    shiftT(8);                      // IntegerLiteral
  }