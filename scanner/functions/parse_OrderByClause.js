function parse_OrderByClause()
  {
    eventHandler.startNonterminal("OrderByClause", e0);
    switch (l1)
    {
    case 201:                       // 'order'
      shift(201);                   // 'order'
      lookahead1W(34);              // S^WS | '(:' | 'by'
      shift(87);                    // 'by'
      break;
    default:
      shift(236);                   // 'stable'
      lookahead1W(67);              // S^WS | '(:' | 'order'
      shift(201);                   // 'order'
      lookahead1W(34);              // S^WS | '(:' | 'by'
      shift(87);                    // 'by'
    }
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_OrderSpecList();
    eventHandler.endNonterminal("OrderByClause", e0);
  }