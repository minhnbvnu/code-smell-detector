function try_GroupByClause()
  {
    shiftT(148);                    // 'group'
    lookahead1W(34);                // S^WS | '(:' | 'by'
    shiftT(87);                     // 'by'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_GroupingSpecList();
  }