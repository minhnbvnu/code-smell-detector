function parse_FLWORStatement()
  {
    eventHandler.startNonterminal("FLWORStatement", e0);
    parse_InitialClause();
    for (;;)
    {
      lookahead1W(173);             // S^WS | '(:' | 'count' | 'for' | 'group' | 'let' | 'order' | 'return' | 'stable' |
      if (l1 == 220)                // 'return'
      {
        break;
      }
      whitespace();
      parse_IntermediateClause();
    }
    whitespace();
    parse_ReturnStatement();
    eventHandler.endNonterminal("FLWORStatement", e0);
  }