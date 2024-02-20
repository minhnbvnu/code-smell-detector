function parse_FTExtensionOption()
  {
    eventHandler.startNonterminal("FTExtensionOption", e0);
    shift(199);                     // 'option'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(17);                // StringLiteral | S^WS | '(:'
    shift(11);                      // StringLiteral
    eventHandler.endNonterminal("FTExtensionOption", e0);
  }