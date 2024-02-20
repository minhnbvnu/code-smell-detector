function parse_JSONSimpleObjectUnion()
  {
    eventHandler.startNonterminal("JSONSimpleObjectUnion", e0);
    shift(278);                     // '{|'
    lookahead1W(272);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 281)                  // '|}'
    {
      whitespace();
      parse_Expr();
    }
    shift(281);                     // '|}'
    eventHandler.endNonterminal("JSONSimpleObjectUnion", e0);
  }