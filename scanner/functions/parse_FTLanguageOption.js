function parse_FTLanguageOption()
  {
    eventHandler.startNonterminal("FTLanguageOption", e0);
    shift(169);                     // 'language'
    lookahead1W(17);                // StringLiteral | S^WS | '(:'
    shift(11);                      // StringLiteral
    eventHandler.endNonterminal("FTLanguageOption", e0);
  }