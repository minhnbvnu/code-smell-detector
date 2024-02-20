function parse_VarValue()
  {
    eventHandler.startNonterminal("VarValue", e0);
    parse_ExprSingle();
    eventHandler.endNonterminal("VarValue", e0);
  }