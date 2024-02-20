function try_CompElemConstructor()
  {
    shiftT(121);                    // 'element'
    lookahead1W(257);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    switch (l1)
    {
    case 276:                       // '{'
      shiftT(276);                  // '{'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_Expr();
      shiftT(282);                  // '}'
      break;
    default:
      try_EQName();
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    shiftT(276);                    // '{'
    lookahead1W(276);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 282)                  // '}'
    {
      try_ContentExpr();
    }
    shiftT(282);                    // '}'
  }