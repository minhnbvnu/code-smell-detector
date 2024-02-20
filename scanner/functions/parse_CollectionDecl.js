function parse_CollectionDecl()
  {
    eventHandler.startNonterminal("CollectionDecl", e0);
    shift(95);                      // 'collection'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(107);               // S^WS | '(:' | ';' | 'as'
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_CollectionTypeDecl();
    }
    eventHandler.endNonterminal("CollectionDecl", e0);
  }