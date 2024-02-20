function try_Annotation()
  {
    shiftT(32);                     // '%'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_EQName();
    lookahead1W(171);               // S^WS | '%' | '(' | '(:' | 'collection' | 'function' | 'index' | 'integrity' |
    if (l1 == 34)                   // '('
    {
      shiftT(34);                   // '('
      lookahead1W(154);             // IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral | S^WS | '(:'
      try_Literal();
      for (;;)
      {
        lookahead1W(101);           // S^WS | '(:' | ')' | ','
        if (l1 != 41)               // ','
        {
          break;
        }
        shiftT(41);                 // ','
        lookahead1W(154);           // IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral | S^WS | '(:'
        try_Literal();
      }
      shiftT(37);                   // ')'
    }
  }