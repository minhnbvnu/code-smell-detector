function parse_ExtensionExpr()
  {
    eventHandler.startNonterminal("ExtensionExpr", e0);
    for (;;)
    {
      whitespace();
      parse_Pragma();
      lookahead1W(100);             // S^WS | '(#' | '(:' | '{'
      if (l1 != 35)                 // '(#'
      {
        break;
      }
    }
    shift(276);                     // '{'
    lookahead1W(273);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 282)                  // '}'
    {
      whitespace();
      parse_Expr();
    }
    shift(282);                     // '}'
    eventHandler.endNonterminal("ExtensionExpr", e0);
  }