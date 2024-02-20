function try_InitialClause()
  {
    switch (l1)
    {
    case 137:                       // 'for'
      lookahead2W(141);             // S^WS | '$' | '(:' | 'sliding' | 'tumbling'
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 16009:                     // 'for' '$'
      try_ForClause();
      break;
    case 174:                       // 'let'
      try_LetClause();
      break;
    default:
      try_WindowClause();
    }
  }