function parse_ArrayUnboxing()
  {
    eventHandler.startNonterminal("ArrayUnboxing", e0);
    shift(69);                      // '['
    lookahead1W(32);                // S^WS | '(:' | ']'
    shift(70);                      // ']'
    eventHandler.endNonterminal("ArrayUnboxing", e0);
  }