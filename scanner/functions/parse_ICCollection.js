function parse_ICCollection()
  {
    eventHandler.startNonterminal("ICCollection", e0);
    shift(197);                     // 'on'
    lookahead1W(39);                // S^WS | '(:' | 'collection'
    shift(95);                      // 'collection'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(140);               // S^WS | '$' | '(:' | 'foreach' | 'node'
    switch (l1)
    {
    case 31:                        // '$'
      whitespace();
      parse_ICCollSequence();
      break;
    case 191:                       // 'node'
      whitespace();
      parse_ICCollSequenceUnique();
      break;
    default:
      whitespace();
      parse_ICCollNode();
    }
    eventHandler.endNonterminal("ICCollection", e0);
  }