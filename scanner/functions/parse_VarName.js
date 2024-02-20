function parse_VarName()
  {
    eventHandler.startNonterminal("VarName", e0);
    parse_EQName();
    eventHandler.endNonterminal("VarName", e0);
  }