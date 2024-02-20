function parse_InlineFunctionExpr()
  {
    eventHandler.startNonterminal("InlineFunctionExpr", e0);
    for (;;)
    {
      lookahead1W(97);              // S^WS | '%' | '(:' | 'function'
      if (l1 != 32)                 // '%'
      {
        break;
      }
      whitespace();
      parse_Annotation();
    }
    shift(145);                     // 'function'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(94);                // S^WS | '$' | '(:' | ')'
    if (l1 == 31)                   // '$'
    {
      whitespace();
      parse_ParamList();
    }
    shift(37);                      // ')'
    lookahead1W(111);               // S^WS | '(:' | 'as' | '{'
    if (l1 == 79)                   // 'as'
    {
      shift(79);                    // 'as'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_SequenceType();
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    whitespace();
    parse_FunctionBody();
    eventHandler.endNonterminal("InlineFunctionExpr", e0);
  }