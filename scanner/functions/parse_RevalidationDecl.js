function parse_RevalidationDecl()
  {
    eventHandler.startNonterminal("RevalidationDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(72);                // S^WS | '(:' | 'revalidation'
    shift(222);                     // 'revalidation'
    lookahead1W(152);               // S^WS | '(:' | 'lax' | 'skip' | 'strict'
    switch (l1)
    {
    case 240:                       // 'strict'
      shift(240);                   // 'strict'
      break;
    case 171:                       // 'lax'
      shift(171);                   // 'lax'
      break;
    default:
      shift(233);                   // 'skip'
    }
    eventHandler.endNonterminal("RevalidationDecl", e0);
  }