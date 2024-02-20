function parse_OrderSpecList()
  {
    eventHandler.startNonterminal("OrderSpecList", e0);
    parse_OrderSpec();
    for (;;)
    {
      lookahead1W(176);             // S^WS | '(:' | ',' | 'count' | 'for' | 'group' | 'let' | 'order' | 'return' |
      if (l1 != 41)                 // ','
      {
        break;
      }
      shift(41);                    // ','
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_OrderSpec();
    }
    eventHandler.endNonterminal("OrderSpecList", e0);
  }