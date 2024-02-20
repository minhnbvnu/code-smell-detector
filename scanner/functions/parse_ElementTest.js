function parse_ElementTest()
  {
    eventHandler.startNonterminal("ElementTest", e0);
    shift(121);                     // 'element'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(260);               // EQName^Token | S^WS | '(:' | ')' | '*' | 'after' | 'allowing' | 'ancestor' |
    if (l1 != 37)                   // ')'
    {
      whitespace();
      parse_ElementNameOrWildcard();
      lookahead1W(101);             // S^WS | '(:' | ')' | ','
      if (l1 == 41)                 // ','
      {
        shift(41);                  // ','
        lookahead1W(254);           // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
        whitespace();
        parse_TypeName();
        lookahead1W(102);           // S^WS | '(:' | ')' | '?'
        if (l1 == 64)               // '?'
        {
          shift(64);                // '?'
        }
      }
    }
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("ElementTest", e0);
  }