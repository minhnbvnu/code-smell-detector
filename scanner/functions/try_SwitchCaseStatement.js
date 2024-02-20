function try_SwitchCaseStatement()
  {
    for (;;)
    {
      shiftT(88);                   // 'case'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_SwitchCaseOperand();
      if (l1 != 88)                 // 'case'
      {
        break;
      }
    }
    shiftT(220);                    // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Statement();
  }