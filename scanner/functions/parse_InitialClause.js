function parse_InitialClause()
  {
    eventHandler.startNonterminal("InitialClause", e0);
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
      parse_ForClause();
      break;
    case 174:                       // 'let'
      parse_LetClause();
      break;
    default:
      parse_WindowClause();
    }
    eventHandler.endNonterminal("InitialClause", e0);
  }