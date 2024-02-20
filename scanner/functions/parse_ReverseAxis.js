function parse_ReverseAxis()
  {
    eventHandler.startNonterminal("ReverseAxis", e0);
    switch (l1)
    {
    case 206:                       // 'parent'
      shift(206);                   // 'parent'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 73:                        // 'ancestor'
      shift(73);                    // 'ancestor'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 213:                       // 'preceding-sibling'
      shift(213);                   // 'preceding-sibling'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    case 212:                       // 'preceding'
      shift(212);                   // 'preceding'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
      break;
    default:
      shift(74);                    // 'ancestor-or-self'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shift(51);                    // '::'
    }
    eventHandler.endNonterminal("ReverseAxis", e0);
  }