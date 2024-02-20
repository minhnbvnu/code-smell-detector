function parse_SimpleMapExpr()
  {
    eventHandler.startNonterminal("SimpleMapExpr", e0);
    parse_PathExpr();
    for (;;)
    {
      if (l1 != 26)                 // '!'
      {
        break;
      }
      shift(26);                    // '!'
      lookahead1W(265);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_PathExpr();
    }
    eventHandler.endNonterminal("SimpleMapExpr", e0);
  }