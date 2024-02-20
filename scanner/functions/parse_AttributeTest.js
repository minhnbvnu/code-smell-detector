function parse_AttributeTest()
  {
    eventHandler.startNonterminal("AttributeTest", e0);
    shift(82);                      // 'attribute'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(260);               // EQName^Token | S^WS | '(:' | ')' | '*' | 'after' | 'allowing' | 'ancestor' |
    if (l1 != 37)                   // ')'
    {
      whitespace();
      parse_AttribNameOrWildcard();
      lookahead1W(101);             // S^WS | '(:' | ')' | ','
      if (l1 == 41)                 // ','
      {
        shift(41);                  // ','
        lookahead1W(254);           // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
        whitespace();
        parse_TypeName();
      }
    }
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("AttributeTest", e0);
  }