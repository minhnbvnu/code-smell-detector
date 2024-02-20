function try_CompNamespaceConstructor()
  {
    shiftT(184);                    // 'namespace'
    lookahead1W(250);               // NCName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    switch (l1)
    {
    case 276:                       // '{'
      shiftT(276);                  // '{'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_PrefixExpr();
      shiftT(282);                  // '}'
      break;
    default:
      try_Prefix();
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    shiftT(276);                    // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_URIExpr();
    shiftT(282);                    // '}'
  }