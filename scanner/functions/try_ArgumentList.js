function try_ArgumentList()
  {
    shiftT(34);                     // '('
    lookahead1W(275);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 37)                   // ')'
    {
      try_Argument();
      for (;;)
      {
        lookahead1W(101);           // S^WS | '(:' | ')' | ','
        if (l1 != 41)               // ','
        {
          break;
        }
        shiftT(41);                 // ','
        lookahead1W(270);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_Argument();
      }
    }
    shiftT(37);                     // ')'
  }