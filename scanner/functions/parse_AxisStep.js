function parse_AxisStep()
  {
    eventHandler.startNonterminal("AxisStep", e0);
    switch (l1)
    {
    case 73:                        // 'ancestor'
    case 74:                        // 'ancestor-or-self'
    case 206:                       // 'parent'
    case 212:                       // 'preceding'
    case 213:                       // 'preceding-sibling'
      lookahead2W(241);             // S^WS | EOF | '!' | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' | ':' |
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 45:                        // '..'
    case 26185:                     // 'ancestor' '::'
    case 26186:                     // 'ancestor-or-self' '::'
    case 26318:                     // 'parent' '::'
    case 26324:                     // 'preceding' '::'
    case 26325:                     // 'preceding-sibling' '::'
      parse_ReverseStep();
      break;
    default:
      parse_ForwardStep();
    }
    lookahead1W(237);               // S^WS | EOF | '!' | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' | ':' |
    whitespace();
    parse_PredicateList();
    eventHandler.endNonterminal("AxisStep", e0);
  }