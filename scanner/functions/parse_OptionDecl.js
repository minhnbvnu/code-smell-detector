function parse_OptionDecl()
  {
    eventHandler.startNonterminal("OptionDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(66);                // S^WS | '(:' | 'option'
    shift(199);                     // 'option'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(17);                // StringLiteral | S^WS | '(:'
    shift(11);                      // StringLiteral
    eventHandler.endNonterminal("OptionDecl", e0);
  }