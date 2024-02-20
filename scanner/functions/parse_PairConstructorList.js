function parse_PairConstructorList()
  {
    eventHandler.startNonterminal("PairConstructorList", e0);
    parse_PairConstructor();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shift(41);                    // ','
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_PairConstructor();
    }
    eventHandler.endNonterminal("PairConstructorList", e0);
  }