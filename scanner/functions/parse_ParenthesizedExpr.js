function parse_ParenthesizedExpr()
  {
    eventHandler.startNonterminal("ParenthesizedExpr", e0);
    shift(34);                      // '('
    lookahead1W(268);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 37)                   // ')'
    {
      whitespace();
      parse_Expr();
    }
    shift(37);                      // ')'
    eventHandler.endNonterminal("ParenthesizedExpr", e0);
  }