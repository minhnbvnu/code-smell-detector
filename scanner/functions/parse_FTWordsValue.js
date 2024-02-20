function parse_FTWordsValue()
  {
    eventHandler.startNonterminal("FTWordsValue", e0);
    switch (l1)
    {
    case 11:                        // StringLiteral
      shift(11);                    // StringLiteral
      break;
    default:
      shift(276);                   // '{'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_Expr();
      shift(282);                   // '}'
    }
    eventHandler.endNonterminal("FTWordsValue", e0);
  }