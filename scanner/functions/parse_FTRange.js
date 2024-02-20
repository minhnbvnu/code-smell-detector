function parse_FTRange()
  {
    eventHandler.startNonterminal("FTRange", e0);
    switch (l1)
    {
    case 130:                       // 'exactly'
      shift(130);                   // 'exactly'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_AdditiveExpr();
      break;
    case 81:                        // 'at'
      shift(81);                    // 'at'
      lookahead1W(125);             // S^WS | '(:' | 'least' | 'most'
      switch (l1)
      {
      case 173:                     // 'least'
        shift(173);                 // 'least'
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        whitespace();
        parse_AdditiveExpr();
        break;
      default:
        shift(183);                 // 'most'
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        whitespace();
        parse_AdditiveExpr();
      }
      break;
    default:
      shift(140);                   // 'from'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_AdditiveExpr();
      shift(248);                   // 'to'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_AdditiveExpr();
    }
    eventHandler.endNonterminal("FTRange", e0);
  }