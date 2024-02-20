function try_ReverseAxis()
  {
    switch (l1)
    {
    case 206:                       // 'parent'
      shiftT(206);                  // 'parent'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 73:                        // 'ancestor'
      shiftT(73);                   // 'ancestor'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 213:                       // 'preceding-sibling'
      shiftT(213);                  // 'preceding-sibling'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    case 212:                       // 'preceding'
      shiftT(212);                  // 'preceding'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
      break;
    default:
      shiftT(74);                   // 'ancestor-or-self'
      lookahead1W(26);              // S^WS | '(:' | '::'
      shiftT(51);                   // '::'
    }
  }