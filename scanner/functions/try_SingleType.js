function try_SingleType()
  {
    try_SimpleTypeName();
    lookahead1W(226);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 64)                   // '?'
    {
      shiftT(64);                   // '?'
    }
  }