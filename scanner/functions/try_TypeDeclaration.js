function try_TypeDeclaration()
  {
    shiftT(79);                     // 'as'
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_SequenceType();
  }