function try_InstanceofExpr()
  {
    try_TreatExpr();
    lookahead1W(223);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 160)                  // 'instance'
    {
      shiftT(160);                  // 'instance'
      lookahead1W(64);              // S^WS | '(:' | 'of'
      shiftT(196);                  // 'of'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_SequenceType();
    }
  }