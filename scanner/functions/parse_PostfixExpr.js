function parse_PostfixExpr()
  {
    eventHandler.startNonterminal("PostfixExpr", e0);
    parse_PrimaryExpr();
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
        whitespace();
        parse_Predicate();
        break;
      default:
        whitespace();
        parse_ArgumentList();
      }
    }
    eventHandler.endNonterminal("PostfixExpr", e0);
  }