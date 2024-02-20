function parse_CompElemConstructor()
  {
    eventHandler.startNonterminal("CompElemConstructor", e0);
    shift(121);                     // 'element'
    lookahead1W(257);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    switch (l1)
    {
    case 276:                       // '{'
      shift(276);                   // '{'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_Expr();
      shift(282);                   // '}'
      break;
    default:
      whitespace();
      parse_EQName();
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    shift(276);                     // '{'
    lookahead1W(276);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 282)                  // '}'
    {
      whitespace();
      parse_ContentExpr();
    }
    shift(282);                     // '}'
    eventHandler.endNonterminal("CompElemConstructor", e0);
  }