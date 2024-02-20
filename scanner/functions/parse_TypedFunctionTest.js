function parse_TypedFunctionTest()
  {
    eventHandler.startNonterminal("TypedFunctionTest", e0);
    shift(145);                     // 'function'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(262);               // EQName^Token | S^WS | '%' | '(' | '(:' | ')' | 'after' | 'allowing' |
    if (l1 != 37)                   // ')'
    {
      whitespace();
      parse_SequenceType();
      for (;;)
      {
        lookahead1W(101);           // S^WS | '(:' | ')' | ','
        if (l1 != 41)               // ','
        {
          break;
        }
        shift(41);                  // ','
        lookahead1W(259);           // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
        whitespace();
        parse_SequenceType();
      }
    }
    shift(37);                      // ')'
    lookahead1W(30);                // S^WS | '(:' | 'as'
    shift(79);                      // 'as'
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_SequenceType();
    eventHandler.endNonterminal("TypedFunctionTest", e0);
  }