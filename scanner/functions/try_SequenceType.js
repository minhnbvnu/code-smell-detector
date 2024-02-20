function try_SequenceType()
  {
    switch (l1)
    {
    case 124:                       // 'empty-sequence'
      lookahead2W(242);             // S^WS | EOF | '!=' | '(' | '(:' | ')' | '*' | '*' | '+' | ',' | '-' | ':' | ':=' |
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 17532:                     // 'empty-sequence' '('
      shiftT(124);                  // 'empty-sequence'
      lookahead1W(22);              // S^WS | '(' | '(:'
      shiftT(34);                   // '('
      lookahead1W(23);              // S^WS | '(:' | ')'
      shiftT(37);                   // ')'
      break;
    default:
      try_ItemType();
      lookahead1W(238);             // S^WS | EOF | '!=' | '(:' | ')' | '*' | '*' | '+' | ',' | '-' | ':' | ':=' | ';' |
      switch (l1)
      {
      case 39:                      // '*'
      case 40:                      // '+'
      case 64:                      // '?'
        try_OccurrenceIndicator();
        break;
      default:
        break;
      }
    }
  }