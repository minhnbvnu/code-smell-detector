function try_FTRange()
  {
    switch (l1)
    {
    case 130:                       // 'exactly'
      shiftT(130);                  // 'exactly'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_AdditiveExpr();
      break;
    case 81:                        // 'at'
      shiftT(81);                   // 'at'
      lookahead1W(125);             // S^WS | '(:' | 'least' | 'most'
      switch (l1)
      {
      case 173:                     // 'least'
        shiftT(173);                // 'least'
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_AdditiveExpr();
        break;
      default:
        shiftT(183);                // 'most'
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_AdditiveExpr();
      }
      break;
    default:
      shiftT(140);                  // 'from'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_AdditiveExpr();
      shiftT(248);                  // 'to'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_AdditiveExpr();
    }
  }