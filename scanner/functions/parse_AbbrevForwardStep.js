function parse_AbbrevForwardStep()
  {
    eventHandler.startNonterminal("AbbrevForwardStep", e0);
    if (l1 == 66)                   // '@'
    {
      shift(66);                    // '@'
    }
    lookahead1W(256);               // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_NodeTest();
    eventHandler.endNonterminal("AbbrevForwardStep", e0);
  }