function parse_PredicateList()
  {
    eventHandler.startNonterminal("PredicateList", e0);
    for (;;)
    {
      lookahead1W(237);             // S^WS | EOF | '!' | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' | ':' |
      if (l1 != 68)                 // '['
      {
        break;
      }
      whitespace();
      parse_Predicate();
    }
    eventHandler.endNonterminal("PredicateList", e0);
  }