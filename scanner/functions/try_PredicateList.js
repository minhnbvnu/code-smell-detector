function try_PredicateList()
  {
    for (;;)
    {
      lookahead1W(237);             // S^WS | EOF | '!' | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' | ':' |
      if (l1 != 68)                 // '['
      {
        break;
      }
      try_Predicate();
    }
  }