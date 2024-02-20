function parse_SwitchCaseStatement()
  {
    eventHandler.startNonterminal("SwitchCaseStatement", e0);
    for (;;)
    {
      shift(88);                    // 'case'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_SwitchCaseOperand();
      if (l1 != 88)                 // 'case'
      {
        break;
      }
    }
    shift(220);                     // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statement();
    eventHandler.endNonterminal("SwitchCaseStatement", e0);
  }