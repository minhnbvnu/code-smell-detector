function parse_SlidingWindowClause()
  {
    eventHandler.startNonterminal("SlidingWindowClause", e0);
    shift(234);                     // 'sliding'
    lookahead1W(85);                // S^WS | '(:' | 'window'
    shift(269);                     // 'window'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    lookahead1W(110);               // S^WS | '(:' | 'as' | 'in'
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_TypeDeclaration();
    }
    lookahead1W(53);                // S^WS | '(:' | 'in'
    shift(154);                     // 'in'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    whitespace();
    parse_WindowStartCondition();
    whitespace();
    parse_WindowEndCondition();
    eventHandler.endNonterminal("SlidingWindowClause", e0);
  }