function try_PostfixExpr()
  {
    try_PrimaryExpr();
    for (;;)
    {
      lookahead1W(240);             // S^WS | EOF | '!' | '!=' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' |
      if (l1 != 34                  // '('
       && l1 != 68)                 // '['
      {
        break;
      }
      switch (l1)
      {
      case 68:                      // '['
        try_Predicate();
        break;
      default:
        try_ArgumentList();
      }
    }
  }