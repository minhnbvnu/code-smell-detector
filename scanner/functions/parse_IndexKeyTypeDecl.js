function parse_IndexKeyTypeDecl()
  {
    eventHandler.startNonterminal("IndexKeyTypeDecl", e0);
    shift(79);                      // 'as'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_AtomicType();
    lookahead1W(169);               // S^WS | '(:' | '*' | '+' | ',' | ';' | '?' | 'collation'
    if (l1 == 39                    // '*'
     || l1 == 40                    // '+'
     || l1 == 64)                   // '?'
    {
      whitespace();
      parse_OccurrenceIndicator();
    }
    eventHandler.endNonterminal("IndexKeyTypeDecl", e0);
  }