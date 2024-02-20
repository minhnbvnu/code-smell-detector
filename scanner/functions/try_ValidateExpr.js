function try_ValidateExpr()
  {
    shiftT(260);                    // 'validate'
    lookahead1W(160);               // S^WS | '(:' | 'lax' | 'strict' | 'type' | '{'
    if (l1 != 276)                  // '{'
    {
      switch (l1)
      {
      case 252:                     // 'type'
        shiftT(252);                // 'type'
        lookahead1W(254);           // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
        try_TypeName();
        break;
      default:
        try_ValidationMode();
      }
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    shiftT(276);                    // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Expr();
    shiftT(282);                    // '}'
  }