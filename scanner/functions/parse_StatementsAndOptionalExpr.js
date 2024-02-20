function parse_StatementsAndOptionalExpr()
  {
    eventHandler.startNonterminal("StatementsAndOptionalExpr", e0);
    parse_Statements();
    if (l1 != 25                    // EOF
     && l1 != 282)                  // '}'
    {
      whitespace();
      parse_Expr();
    }
    eventHandler.endNonterminal("StatementsAndOptionalExpr", e0);
  }