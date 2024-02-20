function try_ForwardStep()
  {
    switch (l1)
    {
    case 82:                        // 'attribute'
      lookahead2W(244);             // S^WS | EOF | '!' | '!=' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' |
      break;
    case 93:                        // 'child'
    case 111:                       // 'descendant'
    case 112:                       // 'descendant-or-self'
    case 135:                       // 'following'
    case 136:                       // 'following-sibling'
    case 229:                       // 'self'
      lookahead2W(241);             // S^WS | EOF | '!' | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' | ':' |
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 26194:                     // 'attribute' '::'
    case 26205:                     // 'child' '::'
    case 26223:                     // 'descendant' '::'
    case 26224:                     // 'descendant-or-self' '::'
    case 26247:                     // 'following' '::'
    case 26248:                     // 'following-sibling' '::'
    case 26341:                     // 'self' '::'
      try_ForwardAxis();
      lookahead1W(256);             // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_NodeTest();
      break;
    default:
      try_AbbrevForwardStep();
    }
  }