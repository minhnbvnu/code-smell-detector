function parse_LetBinding()
  {
    eventHandler.startNonterminal("LetBinding", e0);
    switch (l1)
    {
    case 31:                        // '$'
      shift(31);                    // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_VarName();
      lookahead1W(105);             // S^WS | '(:' | ':=' | 'as'
      if (l1 == 79)                 // 'as'
      {
        whitespace();
        parse_TypeDeclaration();
      }
      break;
    default:
      parse_FTScoreVar();
    }
    lookahead1W(27);                // S^WS | '(:' | ':='
    shift(52);                      // ':='
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("LetBinding", e0);
  }