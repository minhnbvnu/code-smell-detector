function parse_GroupByClause()
  {
    eventHandler.startNonterminal("GroupByClause", e0);
    shift(148);                     // 'group'
    lookahead1W(34);                // S^WS | '(:' | 'by'
    shift(87);                      // 'by'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_GroupingSpecList();
    eventHandler.endNonterminal("GroupByClause", e0);
  }