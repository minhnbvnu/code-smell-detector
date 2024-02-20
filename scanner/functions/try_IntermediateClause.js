function try_IntermediateClause()
  {
    switch (l1)
    {
    case 137:                       // 'for'
    case 174:                       // 'let'
      try_InitialClause();
      break;
    case 266:                       // 'where'
      try_WhereClause();
      break;
    case 148:                       // 'group'
      try_GroupByClause();
      break;
    case 105:                       // 'count'
      try_CountClause();
      break;
    default:
      try_OrderByClause();
    }
  }