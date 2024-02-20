function parse_ReverseStep()
  {
    eventHandler.startNonterminal("ReverseStep", e0);
    switch (l1)
    {
    case 45:                        // '..'
      parse_AbbrevReverseStep();
      break;
    default:
      parse_ReverseAxis();
      lookahead1W(256);             // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_NodeTest();
    }
    eventHandler.endNonterminal("ReverseStep", e0);
  }