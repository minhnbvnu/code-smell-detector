function parse_SwitchCaseOperand()
  {
    eventHandler.startNonterminal("SwitchCaseOperand", e0);
    parse_ExprSingle();
    eventHandler.endNonterminal("SwitchCaseOperand", e0);
  }