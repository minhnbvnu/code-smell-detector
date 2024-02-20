function parse_VarDeclStatement()
  {
    eventHandler.startNonterminal("VarDeclStatement", e0);
    for (;;)
    {
      lookahead1W(98);              // S^WS | '%' | '(:' | 'variable'
      if (l1 != 32)                 // '%'
      {
        break;
      }
      whitespace();
      parse_Annotation();
    }
    shift(262);                     // 'variable'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shift(31);                      // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_VarName();
    lookahead1W(157);               // S^WS | '(:' | ',' | ':=' | ';' | 'as'
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_TypeDeclaration();
    }
    lookahead1W(145);               // S^WS | '(:' | ',' | ':=' | ';'
    if (l1 == 52)                   // ':='
    {
      shift(52);                    // ':='
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_ExprSingle();
    }
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shift(41);                    // ','
      lookahead1W(21);              // S^WS | '$' | '(:'
      shift(31);                    // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_VarName();
      lookahead1W(157);             // S^WS | '(:' | ',' | ':=' | ';' | 'as'
      if (l1 == 79)                 // 'as'
      {
        whitespace();
        parse_TypeDeclaration();
      }
      lookahead1W(145);             // S^WS | '(:' | ',' | ':=' | ';'
      if (l1 == 52)                 // ':='
      {
        shift(52);                  // ':='
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        whitespace();
        parse_ExprSingle();
      }
    }
    shift(53);                      // ';'
    eventHandler.endNonterminal("VarDeclStatement", e0);
  }