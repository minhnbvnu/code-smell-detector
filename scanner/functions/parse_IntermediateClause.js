function parse_IntermediateClause()
  {
    eventHandler.startNonterminal("IntermediateClause", e0);
    switch (l1)
    {
    case 137:                       // 'for'
    case 174:                       // 'let'
      parse_InitialClause();
      break;
    case 266:                       // 'where'
      parse_WhereClause();
      break;
    case 148:                       // 'group'
      parse_GroupByClause();
      break;
    case 105:                       // 'count'
      parse_CountClause();
      break;
    default:
      parse_OrderByClause();
    }
    eventHandler.endNonterminal("IntermediateClause", e0);
  }