function try_FTExtensionOption()
  {
    shiftT(199);                    // 'option'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_EQName();
    lookahead1W(17);                // StringLiteral | S^WS | '(:'
    shiftT(11);                     // StringLiteral
  }