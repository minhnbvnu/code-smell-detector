function parse_WindowVars()
  {
    eventHandler.startNonterminal("WindowVars", e0);
    if (l1 == 31)                   // '$'
    {
      shift(31);                    // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_CurrentItem();
    }
    lookahead1W(159);               // S^WS | '(:' | 'at' | 'next' | 'previous' | 'when'
    if (l1 == 81)                   // 'at'
    {
      whitespace();
      parse_PositionalVar();
    }
    lookahead1W(153);               // S^WS | '(:' | 'next' | 'previous' | 'when'
    if (l1 == 215)                  // 'previous'
    {
      shift(215);                   // 'previous'
      lookahead1W(21);              // S^WS | '$' | '(:'
      shift(31);                    // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_PreviousItem();
    }
    lookahead1W(127);               // S^WS | '(:' | 'next' | 'when'
    if (l1 == 187)                  // 'next'
    {
      shift(187);                   // 'next'
      lookahead1W(21);              // S^WS | '$' | '(:'
      shift(31);                    // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_NextItem();
    }
    eventHandler.endNonterminal("WindowVars", e0);
  }