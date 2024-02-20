function parse_IntersectExceptExpr()
  {
    eventHandler.startNonterminal("IntersectExceptExpr", e0);
    parse_InstanceofExpr();
    for (;;)
    {
      lookahead1W(222);             // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
      if (l1 != 131                 // 'except'
       && l1 != 162)                // 'intersect'
      {
        break;
      }
      switch (l1)
      {
      case 162:                     // 'intersect'
        shift(162);                 // 'intersect'
        break;
      default:
        shift(131);                 // 'except'
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_InstanceofExpr();
    }
    eventHandler.endNonterminal("IntersectExceptExpr", e0);
  }