function parse_Pragma()
  {
    eventHandler.startNonterminal("Pragma", e0);
    shift(35);                      // '(#'
    lookahead1(251);                // EQName^Token | S | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
    if (l1 == 21)                   // S
    {
      shift(21);                    // S
    }
    parse_EQName();
    lookahead1(10);                 // S | '#)'
    if (l1 == 21)                   // S
    {
      shift(21);                    // S
      lookahead1(0);                // PragmaContents
      shift(1);                     // PragmaContents
    }
    lookahead1(5);                  // '#)'
    shift(30);                      // '#)'
    eventHandler.endNonterminal("Pragma", e0);
  }