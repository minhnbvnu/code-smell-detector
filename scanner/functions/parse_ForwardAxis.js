function parse_ForwardAxis()
  {
    eventHandler.startNonterminal("ForwardAxis", e0);
    switch (l1)
    {
    case 93:                        // 'child'
      shift(93);                    // 'child'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 111:                       // 'descendant'
      shift(111);                   // 'descendant'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 82:                        // 'attribute'
      shift(82);                    // 'attribute'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 229:                       // 'self'
      shift(229);                   // 'self'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 112:                       // 'descendant-or-self'
      shift(112);                   // 'descendant-or-self'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 136:                       // 'following-sibling'
      shift(136);                   // 'following-sibling'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    default:
      shift(135);                   // 'following'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
    }
    eventHandler.endNonterminal("ForwardAxis", e0);
  }