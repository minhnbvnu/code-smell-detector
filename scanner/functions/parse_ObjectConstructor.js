function parse_ObjectConstructor()
  {
    eventHandler.startNonterminal("ObjectConstructor", e0);
    shift(276);                     // '{'
    lookahead1W(273);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 282)                  // '}'
    {
      whitespace();
      parse_PairConstructorList();
    }
    shift(282);                     // '}'
    eventHandler.endNonterminal("ObjectConstructor", e0);
  }