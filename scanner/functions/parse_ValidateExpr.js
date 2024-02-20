function parse_ValidateExpr()
  {
    eventHandler.startNonterminal("ValidateExpr", e0);
    shift(260);                     // 'validate'
    lookahead1W(160);               // S^WS | '(:' | 'lax' | 'strict' | 'type' | '{'
    if (l1 != 276)                  // '{'
    {
      switch (l1)
      {
      case 252:                     // 'type'
        shift(252);                 // 'type'
        lookahead1W(254);           // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
        whitespace();
        parse_TypeName();
        break;
      default:
        whitespace();
        parse_ValidationMode();
      }
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    shift(276);                     // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(282);                     // '}'
    eventHandler.endNonterminal("ValidateExpr", e0);
  }