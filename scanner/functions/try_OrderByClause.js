function try_OrderByClause()
  {
    switch (l1)
    {
    case 201:                       // 'order'
      shiftT(201);                  // 'order'
      lookahead1W(34);              // S^WS | '(:' | 'by'
      shiftT(87);                   // 'by'
      break;
    default:
      shiftT(236);                  // 'stable'
      lookahead1W(67);              // S^WS | '(:' | 'order'
      shiftT(201);                  // 'order'
      lookahead1W(34);              // S^WS | '(:' | 'by'
      shiftT(87);                   // 'by'
    }
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_OrderSpecList();
  }