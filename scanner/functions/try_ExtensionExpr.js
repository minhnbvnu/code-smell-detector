function try_ExtensionExpr()
  {
    for (;;)
    {
      try_Pragma();
      lookahead1W(100);             // S^WS | '(#' | '(:' | '{'
      if (l1 != 35)                 // '(#'
      {
        break;
      }
    }
    shiftT(276);                    // '{'
    lookahead1W(273);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 282)                  // '}'
    {
      try_Expr();
    }
    shiftT(282);                    // '}'
  }