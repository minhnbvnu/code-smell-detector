function parse_NamedFunctionRef()
  {
    eventHandler.startNonterminal("NamedFunctionRef", e0);
    parse_EQName();
    lookahead1W(20);                // S^WS | '#' | '(:'
    shift(29);                      // '#'
    lookahead1W(16);                // IntegerLiteral | S^WS | '(:'
    shift(8);                       // IntegerLiteral
    eventHandler.endNonterminal("NamedFunctionRef", e0);
  }