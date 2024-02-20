function try_ParenthesizedItemType()
  {
    shiftT(34);                     // '('
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_ItemType();
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }