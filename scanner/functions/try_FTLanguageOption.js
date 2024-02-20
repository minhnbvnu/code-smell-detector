function try_FTLanguageOption()
  {
    shiftT(169);                    // 'language'
    lookahead1W(17);                // StringLiteral | S^WS | '(:'
    shiftT(11);                     // StringLiteral
  }