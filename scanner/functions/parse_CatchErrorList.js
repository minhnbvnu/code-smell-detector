function parse_CatchErrorList()
  {
    eventHandler.startNonterminal("CatchErrorList", e0);
    parse_NameTest();
    for (;;)
    {
      lookahead1W(136);             // S^WS | '(:' | '{' | '|'
      if (l1 != 279)                // '|'
      {
        break;
      }
      shift(279);                   // '|'
      lookahead1W(256);             // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_NameTest();
    }
    eventHandler.endNonterminal("CatchErrorList", e0);
  }