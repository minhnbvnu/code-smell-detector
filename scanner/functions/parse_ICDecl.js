function parse_ICDecl()
  {
    eventHandler.startNonterminal("ICDecl", e0);
    shift(161);                     // 'integrity'
    lookahead1W(40);                // S^WS | '(:' | 'constraint'
    shift(97);                      // 'constraint'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(120);               // S^WS | '(:' | 'foreign' | 'on'
    switch (l1)
    {
    case 197:                       // 'on'
      whitespace();
      parse_ICCollection();
      break;
    default:
      whitespace();
      parse_ICForeignKey();
    }
    eventHandler.endNonterminal("ICDecl", e0);
  }