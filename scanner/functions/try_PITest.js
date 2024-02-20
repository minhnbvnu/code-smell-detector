function try_PITest()
  {
    shiftT(216);                    // 'processing-instruction'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(252);               // StringLiteral | NCName^Token | S^WS | '(:' | ')' | 'after' | 'allowing' |
    if (l1 != 37)                   // ')'
    {
      switch (l1)
      {
      case 11:                      // StringLiteral
        shiftT(11);                 // StringLiteral
        break;
      default:
        try_NCName();
      }
    }
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }