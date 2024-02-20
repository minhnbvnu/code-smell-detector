function try_GroupingVariable()
  {
    shiftT(31);                     // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_VarName();
  }