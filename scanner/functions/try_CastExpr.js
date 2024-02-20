function try_CastExpr()
  {
    try_UnaryExpr();
    lookahead1W(227);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 89)                   // 'cast'
    {
      shiftT(89);                   // 'cast'
      lookahead1W(30);              // S^WS | '(:' | 'as'
      shiftT(79);                   // 'as'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_SingleType();
    }
  }