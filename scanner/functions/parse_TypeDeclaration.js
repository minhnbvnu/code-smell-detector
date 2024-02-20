function parse_TypeDeclaration()
  {
    eventHandler.startNonterminal("TypeDeclaration", e0);
    shift(79);                      // 'as'
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_SequenceType();
    eventHandler.endNonterminal("TypeDeclaration", e0);
  }