function try_SwitchStatement()
  {
    shiftT(243);                    // 'switch'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Expr();
    shiftT(37);                     // ')'
    for (;;)
    {
      lookahead1W(35);              // S^WS | '(:' | 'case'
      try_SwitchCaseStatement();
      lookahead1W(113);             // S^WS | '(:' | 'case' | 'default'
      if (l1 != 88)                 // 'case'
      {
        break;
      }
    }
    shiftT(109);                    // 'default'
    lookahead1W(70);                // S^WS | '(:' | 'return'
    shiftT(220);                    // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Statement();
  }