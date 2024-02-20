function parse_CollectionTypeDecl()
  {
    eventHandler.startNonterminal("CollectionTypeDecl", e0);
    shift(79);                      // 'as'
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_ItemType();
    lookahead1W(156);               // S^WS | '(:' | '*' | '+' | ';' | '?'
    if (l1 != 53)                   // ';'
    {
      whitespace();
      parse_OccurrenceIndicator();
    }
    eventHandler.endNonterminal("CollectionTypeDecl", e0);
  }