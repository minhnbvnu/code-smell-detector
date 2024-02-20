function parse_FunctionDecl()
  {
    eventHandler.startNonterminal("FunctionDecl", e0);
    shift(145);                     // 'function'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(94);                // S^WS | '$' | '(:' | ')'
    if (l1 == 31)                   // '$'
    {
      whitespace();
      parse_ParamList();
    }
    shift(37);                      // ')'
    lookahead1W(148);               // S^WS | '(:' | 'as' | 'external' | '{'
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_ReturnType();
    }
    lookahead1W(118);               // S^WS | '(:' | 'external' | '{'
    switch (l1)
    {
    case 276:                       // '{'
      shift(276);                   // '{'
      lookahead1W(276);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_StatementsAndOptionalExpr();
      shift(282);                   // '}'
      break;
    default:
      shift(133);                   // 'external'
    }
    eventHandler.endNonterminal("FunctionDecl", e0);
  }