function parse_CompNamespaceConstructor()
  {
    eventHandler.startNonterminal("CompNamespaceConstructor", e0);
    shift(184);                     // 'namespace'
    lookahead1W(250);               // NCName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    switch (l1)
    {
    case 276:                       // '{'
      shift(276);                   // '{'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_PrefixExpr();
      shift(282);                   // '}'
      break;
    default:
      whitespace();
      parse_Prefix();
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    shift(276);                     // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_URIExpr();
    shift(282);                     // '}'
    eventHandler.endNonterminal("CompNamespaceConstructor", e0);
  }