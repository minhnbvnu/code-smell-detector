function try_CastableExpr()
  {
    try_CastExpr();
    lookahead1W(225);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 90)                   // 'castable'
    {
      shiftT(90);                   // 'castable'
      lookahead1W(30);              // S^WS | '(:' | 'as'
      shiftT(79);                   // 'as'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_SingleType();
    }
  }