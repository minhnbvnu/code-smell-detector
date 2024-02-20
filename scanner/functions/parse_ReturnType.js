function parse_ReturnType()
  {
    eventHandler.startNonterminal("ReturnType", e0);
    shift(79);                      // 'as'
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_SequenceType();
    eventHandler.endNonterminal("ReturnType", e0);
  }