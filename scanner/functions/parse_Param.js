function parse_Param()
  {
    eventHandler.startNonterminal("Param", e0);
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(143);               // S^WS | '(:' | ')' | ',' | 'as'
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_TypeDeclaration();
    }
    eventHandler.endNonterminal("Param", e0);
  }