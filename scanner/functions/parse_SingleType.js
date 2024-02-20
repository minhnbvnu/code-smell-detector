function parse_SingleType()
  {
    eventHandler.startNonterminal("SingleType", e0);
    parse_SimpleTypeName();
    lookahead1W(226);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 64)                   // '?'
    {
      shift(64);                    // '?'
    }
    eventHandler.endNonterminal("SingleType", e0);
  }