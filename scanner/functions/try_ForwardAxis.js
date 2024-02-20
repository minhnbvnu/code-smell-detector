function try_ForwardAxis()
  {
    switch (l1)
    {
    case 93:                        // 'child'
      shiftT(93);                   // 'child'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 111:                       // 'descendant'
      shiftT(111);                  // 'descendant'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 82:                        // 'attribute'
      shiftT(82);                   // 'attribute'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 229:                       // 'self'
      shiftT(229);                  // 'self'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 112:                       // 'descendant-or-self'
      shiftT(112);                  // 'descendant-or-self'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 136:                       // 'following-sibling'
      shiftT(136);                  // 'following-sibling'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    default:
      shiftT(135);                  // 'following'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
    }
  }