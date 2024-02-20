function try_TreatExpr()
  {
    try_CastableExpr();
    lookahead1W(224);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 249)                  // 'treat'
    {
      shiftT(249);                  // 'treat'
      lookahead1W(30);              // S^WS | '(:' | 'as'
      shiftT(79);                   // 'as'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_SequenceType();
    }
  }