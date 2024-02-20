function parse_SwitchCaseClause()
  {
    eventHandler.startNonterminal("SwitchCaseClause", e0);
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
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("SwitchCaseClause", e0);
  }