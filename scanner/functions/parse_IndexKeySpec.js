function parse_IndexKeySpec()
  {
    eventHandler.startNonterminal("IndexKeySpec", e0);
    parse_IndexKeyExpr();
    if (l1 == 79)                   // 'as'
    {
      whitespace();
      parse_IndexKeyTypeDecl();
    }
    lookahead1W(146);               // S^WS | '(:' | ',' | ';' | 'collation'
    if (l1 == 94)                   // 'collation'
    {
      whitespace();
      parse_IndexKeyCollation();
    }
    eventHandler.endNonterminal("IndexKeySpec", e0);
  }