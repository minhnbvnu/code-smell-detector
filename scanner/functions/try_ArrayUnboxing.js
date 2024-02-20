function try_ArrayUnboxing()
  {
    shiftT(69);                     // '['
    lookahead1W(32);                // S^WS | '(:' | ']'
    shiftT(70);                     // ']'
  }