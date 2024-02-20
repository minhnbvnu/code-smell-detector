function parse_SequenceTypeUnion()
  {
    eventHandler.startNonterminal("SequenceTypeUnion", e0);
    parse_SequenceType();
    for (;;)
    {
      lookahead1W(134);             // S^WS | '(:' | 'return' | '|'
      if (l1 != 279)                // '|'
      {
        break;
      }
      shift(279);                   // '|'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_SequenceType();
    }
    eventHandler.endNonterminal("SequenceTypeUnion", e0);
  }