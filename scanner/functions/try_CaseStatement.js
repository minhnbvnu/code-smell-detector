function try_CaseStatement()
  {
    shiftT(88);                     // 'case'
    lookahead1W(261);               // EQName^Token | S^WS | '$' | '%' | '(' | '(:' | 'after' | 'allowing' |
    if (l1 == 31)                   // '$'
    {
      shiftT(31);                   // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_VarName();
      lookahead1W(30);              // S^WS | '(:' | 'as'
      shiftT(79);                   // 'as'
    }
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_SequenceType();
    lookahead1W(70);                // S^WS | '(:' | 'return'
    shiftT(220);                    // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Statement();
  }