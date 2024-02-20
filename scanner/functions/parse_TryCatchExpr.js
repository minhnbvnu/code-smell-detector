function parse_TryCatchExpr()
  {
    eventHandler.startNonterminal("TryCatchExpr", e0);
    parse_TryClause();
    for (;;)
    {
      lookahead1W(36);              // S^WS | '(:' | 'catch'
      whitespace();
      parse_CatchClause();
      lookahead1W(183);             // S^WS | EOF | '(:' | ')' | ',' | ':' | ';' | ']' | 'after' | 'as' | 'ascending' |
      if (l1 != 91)                 // 'catch'
      {
        break;
      }
    }
    eventHandler.endNonterminal("TryCatchExpr", e0);
  }