function parse_VarDecl()
  {
    eventHandler.startNonterminal("VarDecl", e0);
    shift(262);                     // 'variable'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    lookahead1W(147);               // S^WS | '(:' | ':=' | 'as' | 'external'
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_TypeDeclaration();
    }
    lookahead1W(106);               // S^WS | '(:' | ':=' | 'external'
    switch (l1)
    {
    case 52:                        // ':='
      shift(52);                    // ':='
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_VarValue();
      break;
    default:
      shift(133);                   // 'external'
      lookahead1W(104);             // S^WS | '(:' | ':=' | ';'
      if (l1 == 52)                 // ':='
      {
        shift(52);                  // ':='
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        whitespace();
        parse_VarDefaultValue();
      }
    }
    eventHandler.endNonterminal("VarDecl", e0);
  }