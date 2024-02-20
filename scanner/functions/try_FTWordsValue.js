function try_FTWordsValue()
  {
    switch (l1)
    {
    case 11:                        // StringLiteral
      shiftT(11);                   // StringLiteral
      break;
    default:
      shiftT(276);                  // '{'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_Expr();
      shiftT(282);                  // '}'
    }
  }