function parse_ForBinding()
  {
    eventHandler.startNonterminal("ForBinding", e0);
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    lookahead1W(164);               // S^WS | '(:' | 'allowing' | 'as' | 'at' | 'in' | 'score'
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_TypeDeclaration();
    }
    lookahead1W(158);               // S^WS | '(:' | 'allowing' | 'at' | 'in' | 'score'
    if (l1 == 72)                   // 'allowing'
    {
      whitespace();
      parse_AllowingEmpty();
    }
    lookahead1W(150);               // S^WS | '(:' | 'at' | 'in' | 'score'
    if (l1 == 81)                   // 'at'
    {
      whitespace();
      parse_PositionalVar();
    }
    lookahead1W(122);               // S^WS | '(:' | 'in' | 'score'
    if (l1 == 228)                  // 'score'
    {
      whitespace();
      parse_FTScoreVar();
    }
    lookahead1W(53);                // S^WS | '(:' | 'in'
    shift(154);                     // 'in'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("ForBinding", e0);
  }